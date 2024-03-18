import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { BlogService } from '../blog.service';
import { BlogPage } from '../model/blog.model';
import { marked } from 'marked';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Comment } from '../model/comment.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/shared/model/person.model';
import { LayoutService } from '../../layout/layout.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertDialogComponent } from 'src/app/shared/dialogs/delete-alert-dialog/delete-alert-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-blog-page-overview',
  templateUrl: './blog-page-overview.component.html',
  styleUrls: ['./blog-page-overview.component.css']
})

export class BlogPageOverviewComponent {
  public user: User;
  public blog: BlogPage={
    description: "",
    title: '',
    status: 0,
    userId: 0,
    username: '',
    ratingSum: 0,
    ratings: []
  };
  public id: number;
  public comments: Comment[]=[];
  public commentLength: number;
  public newComment: string;
  public editMode: boolean;
  public editedComment: Comment | null = null;
  public person: Person={
    id: 0,
    userId: 0,
    name: '',
    surname: '',
    email: '',
    profilePic: 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png',
    biography: '',
    motto: '',
    latitude: NaN,
    longitude: NaN
  };
  public flag:number;
  public ratedBlogNumberOfComments: number = 0;

  commentForm = new FormGroup({
    description: new FormControl('', [Validators.required])
  })

  editCommentForm = new FormGroup({
    description: new FormControl('', [Validators.required])
  })
  
  constructor(private authService: AuthService, private service: BlogService, private route: ActivatedRoute, private layoutService: LayoutService, private toastr: ToastrService, public dialog: MatDialog) {}
  submitted:boolean=false

  ngOnInit(): void {
    this.editMode = false;
    
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.user = this.authService.user$.getValue();

    this.layoutService.getUserProfile(this.user.id, this.user.role).subscribe({
      next: (result: Person) => {
        this.person = result;
      }
    })

    this.service.getBlogById(this.id).subscribe({
      next:(result: BlogPage)=>{
        this.blog = result;
        const rating=this.blog.ratings.find(r=>r.userId==this.user.id);
        this.flag=rating? rating.ratingValue : 0;
        if (this.blog.id != null)
        {
          this.service.getCommentsByBlogId(this.blog.id, this.user.role).subscribe({
            next: (result: PagedResults<Comment>) => {
              this.comments = result.results; 
              console.log(this.comments);
              this.commentLength = result.totalCount;
            },
            error: (error: any) => {
              console.error('An error occurred:', error);
            }
          });          
        }
      }
    })
  }

  renderMarkdown(desc:string): string { 
    let markdown:string =desc || "";
    return marked(markdown);
  }

  deleteComment(comment: Comment){
    const dialogRef = this.dialog.open(DeleteAlertDialogComponent, {
      data: {operation: "delete", type: "comment", title: comment.description},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteComment(comment, this.user.role).subscribe({
          next: () => {
            this.toastr.success('Commant successfully deleted','Success');
            if (this.blog.id != null)
            {
              this.service.getCommentsByBlogId(this.blog.id, this.user.role).subscribe({
                next: (result: PagedResults<Comment>) => {
                  this.comments = result.results;
                  this.commentLength = this.comments.length;
                  
                  if (this.blog.id != null) {
                    this.updateBlogStatus(this.blog.id);
                  }
                }
              })
            }
          },
          error: (error: any) => {
            this.toastr.error('There was an error while deleting comment','Error');
            console.error('An error occurred:', error);
          }
        });
      }
    })
  }

  createComment() {
    this.submitted=true;
    if (this.commentForm.valid) {
      const currentDate = new Date();
      this.submitted=false;
      console.log(this.submitted)
      this.commentForm.get('description')?.markAsUntouched 
      console.log(this.commentForm.get('description')?.touched )
      const comment: Comment = {
        userId: this.user.id,
        username: this.user.username,
        profilePic: this.person.profilePic,
        creationDate: currentDate.toISOString(),
        description: this.commentForm.value.description || "",
        lastEditDate: currentDate.toISOString(),
        blogId: this.blog.id
      }

      this.service.addComment(comment, this.user.role).subscribe({
        next:(result: Comment)=>{
          this.toastr.success('Commant added','Success');
          console.log("Works")
          const addedComment = result;
          addedComment.profilePic = this.person.profilePic;
          addedComment.username = comment.username;
          this.comments.push(addedComment);
          console.log(comment.blogId);
          this.commentForm.controls['description'].setValue('');
          this.commentLength = this.comments.length;

          if (this.blog.id != null)
          {
            this.updateBlogStatus(this.blog.id);
          }
        }
      });
    }
    else {
      //this.toastr.warning('Comment cant be empty','Warning');
      console.log("Please enter description.");
    }
  }

  editComment(comment: Comment) {
    this.editedComment = comment;
    this.editMode = true;
    this.editCommentForm.controls['description'].setValue(comment.description);
  }

  saveChanges() {
    if (this.editCommentForm.valid) {
      const currentDate = new Date();

      if (this.editedComment != null)
      {
        this.editedComment.description = this.editCommentForm.value.description || "";
        this.editedComment.lastEditDate = currentDate.toISOString();

        this.service.updateComment(this.editedComment, this.user.role).subscribe({
          next:()=>{
            this.toastr.success('Comment edited','Success');
            if (this.blog.id)
            {
              this.service.getCommentsByBlogId(this.blog.id, this.user.role).subscribe({
                next:(result: PagedResults<Comment>)=>{
                  this.comments = result.results;
                }
              })
            }
          },
          error: (error: any) => {
            this.toastr.error('There was an error while editing comment','Error');
            console.error('An error occurred:', error);
          }

        });

        this.editedComment = null;
        this.editMode = false;
      }
    }else{
      //this.toastr.warning('Comment cant be empty','Warning');
    }
  }

  cancel() {
    this.editedComment = null;
    this.editMode = false;
  }

  updateBlogStatus(blogId: number) {
    this.service.getNumberOfComments(blogId, this.user.role).subscribe({
      next: (result: number) => {
        this.ratedBlogNumberOfComments = result;

        this.service.getBlogById(blogId).subscribe({
          next: (result: BlogPage) => {
            var blog = result;
            if (blog.status == 2) {
              return;
            }

            if (blog.ratingSum >= 5 && this.ratedBlogNumberOfComments >= 3) {
              if (blog.status == 3) {
                return;
              }
              blog.status = 3;
              console.log(blog);
              this.service.updateBlogOnBlogPage(blog, this.user.role).subscribe({
                next: (result: BlogPage) => {
                  this.blog = result;
                }
              })
            }
            else if (blog.ratingSum <= -1) {
              if (blog.status == 2) {
                return;
              }
              blog.status = 2;
              this.service.updateBlogOnBlogPage(blog, this.user.role).subscribe({
                next: (result: BlogPage) => {
                  this.blog = result;
                }
              })
            }
            else if (blog.ratingSum >= 1 || this.ratedBlogNumberOfComments >= 1) {
              if (blog.status == 4) {
                return;
              }
              blog.status = 4;
              this.service.updateBlogOnBlogPage(blog, this.user.role).subscribe({
                next: (result: BlogPage) => {
                  this.blog = result;
                }
              })
            }
            else if (blog.status != 1) {
              blog.status = 1;
              this.service.updateBlogOnBlogPage(blog, this.user.role).subscribe({
                next: (result: BlogPage) => {
                  this.blog = result;
                }
              })
            }
          }
        })
      }
    })
  }

  rateBlog(flag:boolean,event: Event){
    event.stopPropagation();
    //flag==true clicked upvote
    //flag==false clicked downvote
    if(flag){
      
      //flags[ind]=1 - upvote selected
      //flags[ind]=0 - nothing selected
      //flags[ind]=-1 - downvote selected
      if(this.flag==1){
        this.flag=0;
        
        this.service.deleteRating(this.blog.id,this.user).subscribe({
          next: () => {
            this.blog.ratingSum-=1;
            console.log('works');

            if (this.blog.id != null)
            {
              this.updateBlogStatus(this.blog.id);
            }
          },
          error: (error: any) => {
            console.error('An error occurred:', error);
          }
        });
      }
      else {
        this.service.updateRating(this.blog.id,this.user,1).subscribe({
          next: () => {
            if(this.flag==-1)this.blog.ratingSum+=2;
            else if(this.flag==0)this.blog.ratingSum+=1;
            
            this.flag=1;
            console.log('works');

            if (this.blog.id != null)
            {
              this.updateBlogStatus(this.blog.id);
            }
          },
          error: (error: any) => {
            console.error('An error occurred:', error);
          }
        });
      }
    }
    else{
      if(this.flag==-1){
        this.flag=0;
        this.service.deleteRating(this.blog.id,this.user).subscribe({
          next: () => {
            
            this.blog.ratingSum+=1;
            console.log('works');

            if (this.blog.id != null)
            {
              this.updateBlogStatus(this.blog.id);
            }
          },
          error: (error: any) => {
            console.error('An error occurred:', error);
          }
        });
      }
      else {
        this.service.updateRating(this.blog.id,this.user,-1).subscribe({
          next: () => {
            if(this.flag==1)this.blog.ratingSum-=2;
            else if(this.flag==0)this.blog.ratingSum-=1;
            this.flag=-1;
            console.log('works');

            if (this.blog.id != null)
            {
              this.updateBlogStatus(this.blog.id);
            }
          },
          error: (error: any) => {
            console.error('An error occurred:', error);
          }
        });
      }
    }
    
  }
}
