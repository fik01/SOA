import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';
import { BlogPage } from '../model/blog.model';
import { marked } from 'marked';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Tour } from '../../tour-authoring/model/tour.model';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { EquipmentTracking } from '../../marketplace/model/equipmentTracking.model';
import { Equipment } from '../../marketplace/model/equipment.model';
import { MarketplaceService } from '../../marketplace/marketplace.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
})
export class BlogCreateComponent implements OnInit {
  public user: User;
  public tour: Tour;
  public tourDetails: string = '';
  public tourKeyPoints: string = '';
  public equipmentIds: number[] = [];
  public myEquipment: Equipment[] = [];
  public usedEquipment: Equipment[] = [];
  public tourId: number;

  constructor(
    private service: BlogService,
    private router: Router,
    private authService: AuthService,
    private tourAuthService: TourAuthoringService,
    private marketPlaceService: MarketplaceService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.user$.getValue();
    this.route.params.subscribe((params) => {
      this.tourId = +params['id'];
    });
    if (this.tourId) {
      this.getTour();
    }
  }

  getTour() {
    this.tourAuthService.getTour(this.tourId).subscribe({
      next: (result: Tour | null) => {
        if (result) {
          this.tour = result;

          this.tourKeyPoints = '';

          for (let i = 0; i < this.tour.keyPoints.length; i += 3) {
            const firstKeyPoint = this.tour.keyPoints[i];
            const secondKeyPoint =
              i + 1 < this.tour.keyPoints.length
                ? this.tour.keyPoints[i + 1]
                : null;
            const thirdKeyPoint =
              i + 1 < this.tour.keyPoints.length
                ? this.tour.keyPoints[i + 2]
                : null;
            this.tourKeyPoints +=
              `|  |  |  |\n` +
              `| --- | --- | --- |\n` +
              `| **${firstKeyPoint.name}** ${firstKeyPoint.description} | ` +
              (secondKeyPoint
                ? `**${secondKeyPoint.name}** ${secondKeyPoint.description} |`
                : '') +
              (thirdKeyPoint
                ? `**${thirdKeyPoint.name}** ${thirdKeyPoint.description}`
                : '') +
              ' |\n';

            this.tourKeyPoints +=
              `| <img src="${firstKeyPoint.image}" width="280px" height="210px"> | ` +
              (secondKeyPoint
                ? `<img src="${secondKeyPoint.image}" width="280px" height="210px">  | `
                : '') +
              (thirdKeyPoint
                ? `<img src="${thirdKeyPoint.image}" width="280px" height="210px">`
                : '') +
              ' |\n\n';
          }

          this.tourDetails =
            '---\n### The tour lasted for ' +
            parseInt(
              (this.tour.durations[0].timeInSeconds / 3600).toString(),
              10
            ) +
            ' minutes and covered a distance of ' +
            +parseFloat(this.tour.distanceInKm.toFixed(2)) +
            ' km\n\n' +
            '---\n' +
            '## **Keypoints**\n\n' +
            this.tourKeyPoints +
            '---\n' +
            '## **Equipment used on tour:**\n\n';
          this.getEquipmentTracking();
        } else {
          console.warn('Tour not found or is null.');
        }
      },
    });
  }
  
  getEquipmentTracking() {
    this.marketPlaceService.getEquipmentTrackingByTouristId().subscribe({
      next: (result: EquipmentTracking) => {
        this.equipmentIds = result.neededEquipment;
        this.getMyEquipment();
      },
    });
  }

  getMyEquipment(): void {
    this.marketPlaceService.getAllEquipment().subscribe({
      next: (result: PagedResults<Equipment>) => {
        if (this.equipmentIds.length > 0) {
          this.myEquipment = result.results.filter(
            (equipment) =>
              equipment.id !== undefined &&
              this.equipmentIds.includes(equipment.id)
          );
        }
      },
      error: () => {
        console.log(console.error);
      },
    });
  }

  updateMyEquipment(equipment: Equipment): void {
    if (this.usedEquipment.includes(equipment)) {
      this.usedEquipment = this.usedEquipment.filter(
        (e) => e.id !== equipment.id
      );
    } else {
      this.usedEquipment.push(equipment);
    }

    this.tourDetails =
      '---\n' +
      '### The tour lasted for ' +
      parseInt((this.tour.durations[0].timeInSeconds / 3600).toString(), 10) +
      ' minutes and covered a distance of ' +
      +parseFloat(this.tour.distanceInKm.toFixed(2)) +
      ' km\n\n' +
      '---\n' +
      '## **Keypoints**\n\n' +
      this.tourKeyPoints +
      '---\n' +
      '## **Equipment used on tour:**\n\n';
    for (const equipment of this.usedEquipment) {
      this.tourDetails += '-' + equipment.name + '\n\n';
    }
    
  }

  blogCreateForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  submitted:boolean=false

  createBlog(): void {
    this.submitted=true

    if (this.blogCreateForm.valid) {
      
      

      var blogDescription = this.blogCreateForm.value.description || '';
      if (this.tourId) {
        blogDescription += this.tourDetails;
      }
      const blogPage: BlogPage = {
        title: this.blogCreateForm.value.title || '',
        description: blogDescription,
        status: 1,
        userId: this.user.id,
        username: this.user.username,
        ratingSum: 0,
        ratings: [],
      };
      this.service.createBlog(blogPage).subscribe({
        next: () => {
          this.router.navigate(['blogs-overview']);
          this.toastr.success('Blog successfully created','Success');
        },
        error: () => {
          this.toastr.error('Error while creating blog','Error');
        },
      });
    }
    
  }

  renderMarkdown(): string {
    let markdown: string = this.blogCreateForm.value.description || '';
    if (this.tourId) {
      markdown += '\n\n' + this.tourDetails;
    }
    return marked(markdown);
  }
}
