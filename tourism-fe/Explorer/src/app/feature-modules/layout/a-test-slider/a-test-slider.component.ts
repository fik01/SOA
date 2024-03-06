import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TeamMember } from '../model/teamMember';

@Component({
  selector: 'xp-a-test-slider',
  templateUrl: './a-test-slider.component.html',
  styleUrls: ['./a-test-slider.component.css']
})
export class ATestSliderComponent {
  LeopoldinaDjanic: TeamMember = {
    name: "Leopoldina Djanic",
    avatar: "../../../../assets/avatars/leopoldina.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
  }
  NevenaGligorov: TeamMember = {
    name: "Nevena Gligorov",
    avatar: "../../../../assets/avatars/nevena.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
  }
  JovanKatanic: TeamMember = {
    name: "Jovan Katanic",
    avatar: "../../../../assets/avatars/jovo.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
  }
  AleksaDjukic: TeamMember = {
    name: "Aleksa Djukic",
    avatar: "../../../../assets/avatars/aleksa.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
  }
  JovanJokic: TeamMember = {
    name: "Jovan Jokic",
    avatar: "../../../../assets/avatars/joja.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
  }
  LukaSavkov: TeamMember = {
    name: "Luka Savkov",
    avatar: "../../../../assets/avatars/luka.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
  }
  MarkoRadetic: TeamMember = {
    name: "Marko Radetic",
    avatar: "../../../../assets/avatars/radetic.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
  }
  JovanSarac: TeamMember = {
    name: "Jovan Sarac",
    avatar: "../../../../assets/avatars/sarac.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
  }
  UrosJevtic: TeamMember = {
    name: "Uros Jevtic",
    avatar: "../../../../assets/avatars/jevtic.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
  }
  NedeljkoBabic: TeamMember = {
    name: "Nedeljko Babic",
    avatar: "../../../../assets/avatars/babic.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
  }
  AnaRanic: TeamMember = {
    name: "Ana Ranic",
    avatar: "../../../../assets/avatars/ana.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
  }
  MarkoBoskovic: TeamMember = {
    name: "Marko Boskovic",
    avatar: "../../../../assets/avatars/boskovic.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
  }
  StrahinjaBanjanac: TeamMember = {
    name: "Strahinja Banjanac",
    avatar: "../../../../assets/avatars/banja.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
  }
  JelenaBlanusa: TeamMember = {
    name: "Jelena Blanusa",
    avatar: "../../../../assets/avatars/blanusa.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
  }
  MarinaKicanovic: TeamMember = {
    name: "Marina Kicanovic",
    avatar: "../../../../assets/avatars/marina.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
  }
  FilipDjokic: TeamMember = {
    name: "Filip Djokic",
    avatar: "../../../../assets/avatars/djokic.png",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
  }

  arr: TeamMember[] = [this.LeopoldinaDjanic, this.NevenaGligorov, this.JovanKatanic, this.AleksaDjukic, this.JovanJokic, this.LukaSavkov, this.MarkoRadetic, this.JovanSarac, this.UrosJevtic, this.NedeljkoBabic, this.AnaRanic, this.MarkoBoskovic, this.StrahinjaBanjanac, this.JelenaBlanusa, this.MarinaKicanovic, this.FilipDjokic];
  totalCards: number = this.arr.length;
  cardsPerPage: number;
  currentPage: number = 1;
  totalPages: number;
  pagePosition: string = "0%";
  overflowWidth: string;
  cardWidth: string;
  containerWidth: number;

  @ViewChild("container", {static: true, read: ElementRef})
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
    this.cardsPerPage = this.getCardsPerPage();
    this.initializeSlider();
  }

  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    this.overflowWidth = `calc(${this.totalPages * 100}% + ${this.totalPages *
      10}px)`;
      this.cardWidth = `calc((${100 / this.totalPages}% - ${this.cardsPerPage *
        10}px) / ${this.cardsPerPage})`;
  }

  getCardsPerPage() {
    return Math.floor(this.container.nativeElement.offsetWidth / 200);
  }

  changePage(incrementor: number) {
    this.currentPage += incrementor;
    this.populatePagePosition();
  }

  populatePagePosition() {
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${10 *
      (this.currentPage - 1)}px)`;
  }
}
