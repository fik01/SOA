import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { BlogService } from '../blog.service';
import { BlogPage } from '../model/blog.model';
import { marked } from 'marked';
import { Person } from 'src/app/shared/model/person.model';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: 'xp-blogs-overview',
  templateUrl: './blogs-overview.component.html',
  styleUrls: ['./blogs-overview.component.css']
})
export class BlogsOverviewComponent {
  public blogs:BlogPage[] = [];
  public user: User;
  public flags: number[];
  public ratedBlogNumberOfComments: number = 0;
  public followingIds: number[] = [];

  constructor(private authService: AuthService, private service: BlogService, private router: Router, private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.user = this.authService.user$.getValue();
    this.layoutService.getFollowings(this.user.id, this.user.role).subscribe({
      next: (result: Person[]) => {
          this.followingIds = result.map(person => person.id)
          this.followingIds.push(this.user.id)
          this.getBlogs()
      }
    })
  }

  getBlogs() {
    this.followingIds.forEach(followingId=> {
      this.service.getBlogsByAuthor(followingId, this.user).subscribe({
        next: (result: BlogPage[]) => {
          this.blogs.push(...result)
          this.blogs.sort((a, b) => a.title.localeCompare(b.title));
          this.initFlags();
        }
      });
    });    
  }

  private initFlags() {
    this.flags = new Array<number>(this.blogs.length).fill(0);
    this.blogs.forEach((blog, i) => {

      const foundObjects = blog.ratings.find(obj => obj.userId === this.user.id);
      if (foundObjects) {
        this.flags[i] = foundObjects.ratingValue;
      }
    });
  }

  filterBlogs(status: number): void {
    this.service.getBlogsByStatus(status, this.user).subscribe({
      next: (result: BlogPage[]) => {

        this.blogs = result.sort((a, b) => a.title.localeCompare(b.title));

        this.initFlags();
      }
    });
  }

  createBlog() {
    this.router.navigate(['blog/create', 0]);
  }

  openBlogPage(blog: BlogPage) {
    this.router.navigate(['blogPage-overview', blog.id]);
  }

  renderMarkdown(desc: string): string {
    let markdown: string = desc || "";
    return marked(markdown);
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
                  let itemToUpdate = this.blogs.find((item) => item.id === blog.id);
                  if (itemToUpdate) {
                    itemToUpdate.status = 3;
                  }
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
                  let itemToUpdate = this.blogs.find((item) => item.id === blog.id);
                  if (itemToUpdate) {
                    itemToUpdate.status = 2;
                  }
                }
              })
            }
            else if ((blog.ratingSum >= 1 || this.ratedBlogNumberOfComments >= 1)) {
              if (blog.status == 4) {
                return;
              }
              blog.status = 4;
              this.service.updateBlogOnBlogPage(blog, this.user.role).subscribe({
                next: (result: BlogPage) => {
                  let itemToUpdate = this.blogs.find((item) => item.id === blog.id);
                  if (itemToUpdate) {
                    itemToUpdate.status = 4;
                  }
                }
              })
            }
            else if (blog.status != 1) {
              blog.status = 1;
              this.service.updateBlogOnBlogPage(blog, this.user.role).subscribe({
                next: (result: BlogPage) => {
                  let itemToUpdate = this.blogs.find((item) => item.id === blog.id);
                  if (itemToUpdate) {
                    itemToUpdate.status = 4;
                  }
                }
              })
            }
          }
        })
      }
    })
  }

  rateBlog(flag: boolean, event: Event, index: number, element: any) {
    event.stopPropagation();

    //flag==true clicked upvote
    //flag==false clicked downvote
    if (flag) {

      //flags[ind]=1 - upvote selected
      //flags[ind]=0 - nothing selected
      //flags[ind]=-1 - downvote selected
      if (this.flags[index] == 1) {
        this.flags[index] = 0;

        this.service.deleteRating(element.id, this.user).subscribe({
          next: () => {
            element.ratingSum -= 1;
            this.updateBlogStatus(element.id);
          },
          error: (error: any) => {
            console.error('An error occurred:', error);
          }
        });
      }
      else {
        this.service.updateRating(element.id, this.user, 1).subscribe({
          next: () => {
            if (this.flags[index] == -1) element.ratingSum += 2;
            else if (this.flags[index] == 0) element.ratingSum += 1;
            this.flags[index] = 1;
            this.updateBlogStatus(element.id);
          },
          error: (error: any) => {
            console.error('An error occurred:', error);
          }
        });
      }
    }
    else {
      if (this.flags[index] == -1) {
        this.flags[index] = 0;
        this.service.deleteRating(element.id, this.user).subscribe({
          next: () => {
            element.ratingSum += 1;
            this.updateBlogStatus(element.id);
          },
          error: (error: any) => {
            console.error('An error occurred:', error);
          }
        });
      }
      else {
        this.service.updateRating(element.id, this.user, -1).subscribe({
          next: () => {
            if (this.flags[index] == 1) element.ratingSum -= 2;
            else if (this.flags[index] == 0) element.ratingSum -= 1;
            this.flags[index] = -1;
            this.updateBlogStatus(element.id);
          },
          error: (error: any) => {
            console.error('An error occurred:', error);
          }
        });
      }
    }
  }
}
