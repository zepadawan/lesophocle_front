import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Result } from 'src/app/models/result-modele';
import { FilesDirectoryService } from 'src/app/services/files-directory.service';
import { environment } from 'src/environments/environment';
// import { MatCarousel, MatCarouselComponent, MatCarouselSlide, MatCarouselSlideComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'node-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnChanges {

  images: string[];

  // folder --------->
  _folder: string;
  @Input()
  set folder(value: string) {
    this._folder = value;
  }
  get folder(): string {
    return this._folder;
  }
  // <------------

  @Input() isSmall: boolean;

  apathImage: string;
  constructor(private filesDirectoryService: FilesDirectoryService) {
    this.isSmall = true;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (!changes.folder.firstChange) {
    const current = changes.folder.currentValue;
    this.folder = current;
    this.apathImage = `${environment.api_image}` + this.folder;
    console.log('this.apathImage', this.apathImage);
    this.filesDirectoryService.getFiles(this.folder)
      .then((data: Result) => {
        this.images = data.args;
      })
      .catch();

    // }
  }
}
