import { Component } from '@angular/core';

@Component({
  selector: 'xp-frequent-questions',
  templateUrl: './frequent-questions.component.html',
  styleUrls: ['./frequent-questions.component.css']
})
export class FrequentQuestionsComponent {
  isExpanded:boolean[] = [false,false,false,false,false];

  toggleExpand(ind:number) {
    this.isExpanded[ind] = !this.isExpanded[ind];
  }
}
