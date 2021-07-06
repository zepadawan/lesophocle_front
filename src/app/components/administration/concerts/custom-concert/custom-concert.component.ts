import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Evenement } from 'src/app/models/evenement.model';

@Component({
  selector: 'node-custom-concerts',
  templateUrl: './custom-concert.component.html',
  styleUrls: ['./custom-concert.component.css']
})
export class CustomConcertComponent implements OnInit {

  @Input() concertForm :  FormGroup;
  @Input() imagePreview : string;
  evenement: Evenement;
  obligatoire = "saise requise";

  constructor() { }

  ngOnInit(): void {
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.concertForm.get('sampleFile').patchValue(file);
    this.concertForm.get('sampleFile').updateValueAndValidity();
    const reader = new FileReader();

    reader.onloadend = () => {
      if (this.concertForm.get('sampleFile').valid) {
        this.imagePreview = (reader.result as string);
      } else {
        this.imagePreview = null;
      }
    }
    reader.readAsDataURL(file);
  }

}
