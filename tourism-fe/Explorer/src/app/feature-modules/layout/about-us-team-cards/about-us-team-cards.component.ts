import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TeamMember } from '../model/teamMember';

@Component({
  selector: 'xp-about-us-team-cards',
  templateUrl: './about-us-team-cards.component.html',
  styleUrls: ['./about-us-team-cards.component.css']
})
export class AboutUsTeamCardsComponent {
  LeopoldinaDjanic: TeamMember = {
    name: "Leopoldina Djanic",
    avatar: "../../../../assets/avatars/leopoldina.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    githubLink: 'https://github.com/leopoldina01',
    linkedin: 'https://www.linkedin.com/in/leopoldina-djanic-35ab15279'
  }
  NevenaGligorov: TeamMember = {
    name: "Nevena Gligorov",
    avatar: "../../../../assets/avatars/nevena.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    githubLink: 'https://github.com/Nevenaa01',
    linkedin: 'https://www.linkedin.com/in/nevena-gligorov'
  }
  JovanKatanic: TeamMember = {
    name: "Jovan Katanic",
    avatar: "../../../../assets/avatars/jovo.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    githubLink: 'https://github.com/JovanKatanic',
    linkedin: 'https://www.linkedin.com/in/jovan-katanic-21616426b'
  }
  AleksaDjukic: TeamMember = {
    name: "Aleksa Djukic",
    avatar: "../../../../assets/avatars/aleksa.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    githubLink: 'https://github.com/alexadjukic',
    linkedin: 'https://www.linkedin.com/in/aleksa-djukic-946934289'
  }
  JovanJokic: TeamMember = {
    name: "Jovan Jokic",
    avatar: "../../../../assets/avatars/joja.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    githubLink: 'https://github.com/jovanj01',
    linkedin: ''
  }
  LukaSavkov: TeamMember = {
    name: "Luka Savkov",
    avatar: "../../../../assets/avatars/luka.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    githubLink: 'https://github.com/SavkovL',
    linkedin: ''
  }
  MarkoRadetic: TeamMember = {
    name: "Marko Radetic",
    avatar: "../../../../assets/avatars/radetic.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    githubLink: 'https://github.com/Ratherthicc',
    linkedin: 'http://www.linkedin.com/in/markoradetic'
  }
  JovanSarac: TeamMember = {
    name: "Jovan Sarac",
    avatar: "../../../../assets/avatars/sarac.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    githubLink: 'https://github.com/JovanSarac',
    linkedin: ''
  }
  UrosJevtic: TeamMember = {
    name: "Uros Jevtic",
    avatar: "../../../../assets/avatars/jevtic.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    githubLink: 'https://github.com/urosjevtic',
    linkedin: 'https://www.linkedin.com/in/ur0sjevtic/'
  }
  NedeljkoBabic: TeamMember = {
    name: "Nedeljko Babic",
    avatar: "../../../../assets/avatars/babic.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    githubLink: 'https://github.com/betavojnik',
    linkedin: ''
  }
  AnaRanic: TeamMember = {
    name: "Ana Ranic",
    avatar: "../../../../assets/avatars/ana.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    githubLink: 'https://github.com/ana080901',
    linkedin: ''
  }
  MarkoBoskovic: TeamMember = {
    name: "Marko Boskovic",
    avatar: "../../../../assets/avatars/boskovic.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    githubLink: 'https://github.com/Boshk0420',
    linkedin: ''
  }
  StrahinjaBanjanac: TeamMember = {
    name: "Strahinja Banjanac",
    avatar: "../../../../assets/avatars/banja.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    githubLink: 'https://github.com/banja001',
    linkedin: ''
  }
  JelenaBlanusa: TeamMember = {
    name: "Jelena Blanusa",
    avatar: "../../../../assets/avatars/blanusa.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    githubLink: 'https://github.com/jblanusa13',
    linkedin: ''
  }
  MarinaKicanovic: TeamMember = {
    name: "Marina Kicanovic",
    avatar: "../../../../assets/avatars/marina.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    githubLink: 'https://github.com/mareenah',
    linkedin: ''
  }
  FilipDjokic: TeamMember = {
    name: "Filip Djokic",
    avatar: "../../../../assets/avatars/djokic.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    githubLink: 'https://github.com/fik01',
    linkedin: ''
  }

  

  teamMembers: TeamMember[] = [this.LeopoldinaDjanic, this.NevenaGligorov, this.JovanKatanic, this.MarkoRadetic, this.AleksaDjukic, this.JovanJokic, this.LukaSavkov, this.JovanSarac, this.UrosJevtic, this.NedeljkoBabic, this.AnaRanic, this.MarkoBoskovic, this.StrahinjaBanjanac, this.JelenaBlanusa, this.MarinaKicanovic, this.FilipDjokic];
  totalCards: number = this.teamMembers.length;
  currentPage: number = 1;
  pagePosition: string = "0%";
  cardsPerPage: number;
  totalPages: number;
  overflowWidth: string;
  cardWidth: string;
  containerWidth: number;

  @ViewChild("container", { static: true, read: ElementRef })
  container: ElementRef;

  @HostListener("window:resize") windowResize() {
    let newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage != this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.populatePagePosition();
      }
    }
  }

  ngOnInit() {
    this.cardsPerPage = 4;
    this.initializeSlider();
  }

  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    this.overflowWidth = `calc(${this.totalPages * 100}% + ${this.totalPages *
      10}px)`;
      this.cardWidth = `calc((${100 / this.totalPages}% - ${this.cardsPerPage *
        20}px) / ${this.cardsPerPage})`;
  }

  getCardsPerPage() {
    return Math.floor(this.container.nativeElement.offsetWidth / (320));
  }

  changePage(incrementor: number) {
    this.currentPage += incrementor;
    this.populatePagePosition();
  }

  populatePagePosition() {
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${
      (this.currentPage + 5)}px)`
  }
}
