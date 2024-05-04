import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Comment } from './model/comment.model';
import { BlogPage } from './model/blog.model';
import { environment } from 'src/env/environment';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  addComment(comment: Comment, role: string): Observable<Comment> {
    if (role != 'tourist' && role != 'author')
      return this.http.post<Comment>(environment.apiHost, comment);
    else
      return this.http.post<Comment>(
        environment.apiHost + role + '/blog/createComment',
        comment
      );
  }

  getAllComments(role: string): Observable<PagedResults<Comment>> {
    if (role != 'tourist' && role != 'author')
      return this.http.get<PagedResults<Comment>>(environment.apiHost);
    else
      return this.http.get<PagedResults<Comment>>(
        environment.apiHost + role + '/blog/allComments'
      );
  }

  getCommentsByBlogId(
    blogId: number,
    role: string
  ): Observable<PagedResults<Comment>> {
    return this.http.get<PagedResults<Comment>>(
      environment.apiHost + role + '/blog/blogComments/' + blogId
    );
  }

  getCommentById(commentId: number, role: string): Observable<Comment> {
    if (role != 'tourist' && role != 'author')
      return this.http.get<Comment>(environment.apiHost + '/' + commentId);
    else
      return this.http.get<Comment>(
        environment.apiHost + role + '/blog/comment/' + commentId
      );
  }

  updateComment(comment: Comment, role: string): Observable<Comment> {
    if (role != 'tourist' && role != 'author')
      return this.http.put<Comment>(
        environment.apiHost + '/' + comment.id,
        comment
      );
    else
      return this.http.put<Comment>(
        environment.apiHost + role + '/blog/editComment',
        comment
      );
  }

  createBlog(blogPage: BlogPage): Observable<BlogPage> {
    const user = this.authService.user$.getValue();
    if (user.role == 'author')
      return this.http.post<BlogPage>(
        environment.apiHost + 'author/blog',
        blogPage
      );
    else if (user.role == 'tourist')
      return this.http.post<BlogPage>(
        environment.apiHost + 'tourist/blog',
        blogPage
      );
    else return this.http.post<BlogPage>(environment.apiHost, blogPage);
  }

  getAll(userId: number): Observable<BlogPage[]> {
    const user = this.authService.user$.getValue();
    if (user.role == 'author')
      return this.http.get<BlogPage[]>(environment.apiHost + 'author/blog');
    else if (user.role == 'tourist')
      return this.http.get<BlogPage[]>(
        environment.apiHost + 'tourist/blog/allBlogs/' + userId
      );
    else return this.http.get<BlogPage[]>(environment.apiHost);
  }

  getBlogById(blogId: number): Observable<BlogPage> {
    const user = this.authService.user$.getValue();
    if (user.role == 'author')
      return this.http.get<BlogPage>(
        environment.apiHost + 'author/blog/' + blogId
      );
    else if (user.role == 'tourist')
      return this.http.get<BlogPage>(
        environment.apiHost + 'tourist/blog/' + blogId
      );
    else return this.http.get<BlogPage>(environment.apiHost);
  }

  deleteComment(comment: Comment, role: string): Observable<Comment> {
    return this.http.delete<Comment>(
      environment.apiHost + role + '/blog/deleteComment/' + comment.id
    );
  }

  updateRating(
    blogId: number | undefined,
    user: User,
    value: number
  ): Observable<BlogPage> {
    return this.http.put<BlogPage>(
      environment.apiHost +
        user.role +
        '/blog/rating/' +
        user.id +
        '/' +
        blogId +
        '/' +
        value,
      null
    );
  }

  deleteRating(blogId: number | undefined, user: User): Observable<BlogPage> {
    return this.http.delete<BlogPage>(
      environment.apiHost + user.role + '/blog/rating/' + user.id + '/' + blogId
    );
  }

  getBlogsByStatus(status: number, user: User): Observable<BlogPage[]> {
    return this.http.get<BlogPage[]>(
      environment.apiHost + user.role + '/blog/getByStatus/' + status
    );
  }

  getBlogsByAuthor(authorId: number, user: User): Observable<BlogPage[]> {
    return this.http.get<BlogPage[]>(
      environment.apiHost + user.role + '/blog/getByAuthor/' + authorId
    );
  }

  getNumberOfComments(blogId: number, role: string): Observable<number> {
    return this.getCommentsByBlogId(blogId, role).pipe(
      map((comments) => comments.totalCount)
    );
  }

  updateBlog(blog: BlogPage, role: string): Observable<BlogPage[]> {
    return this.http.put<BlogPage[]>(
      environment.apiHost + role + '/blog',
      blog
    );
  }

  updateBlogOnBlogPage(blog: BlogPage, role: string): Observable<BlogPage> {
    return this.http.put<BlogPage>(
      environment.apiHost + role + '/blog/oneBlogUpdated',
      blog
    );
  }
}
