import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'node-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  slides: string[];
  constructor() { }

  ngOnInit(): void {
    this.slides = [
      "https://source.unsplash.com/1600x900/?nature,water",
      "https://source.unsplash.com/1600x1600/?nature,forest"
    ]
  }
}

