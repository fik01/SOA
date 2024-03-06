import { Component, DoCheck, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'xp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  hiddenElements: NodeListOf<HTMLElement>;
  user: User;
  private subscription: Subscription;

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show-main');
      } else {
        entry.target.classList.remove('show-main');
      }
    });
  });

  constructor(private authService: AuthService, private layoutService: LayoutService){
    this.subscription = this.layoutService.refreshFooter$.subscribe(() => {
      this.animatePage();
    });
  }
  ngOnInit() {
    this.animatePage();
  }
  ngDoCheck(){
    this.animatePage();
  }

  animatePage(){
    this.user = this.authService.user$.getValue();
    this.hiddenElements = document.querySelectorAll('.hidden');
    this.hiddenElements.forEach((el) => this.observer.observe(el));
  }

}
