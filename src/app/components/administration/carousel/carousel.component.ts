import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatCarousel, MatCarouselComponent, MatCarouselSlide, MatCarouselSlideComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'node-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() images: string[];
  @Input() folder: string;
  apathImage: string;
  // apathImage = `${environment.api_image}` + 'concerts/';
  constructor() { }

  ngOnInit(): void {
    this.apathImage = `${environment.api_image}` + this.folder + '/';

  }
}

