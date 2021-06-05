import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Categorie } from 'src/app/models/categorie-modele';
import { Plat } from 'src/app/models/plat-modele';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'node-common-plat-form',
  templateUrl: './common-plat-form.component.html',
  styleUrls: ['./common-plat-form.component.css']
})
export class CommonPlatFormComponent implements OnInit {

  platForm: FormGroup;
  errorMessage: string;
  successMessage: string = 'Modifier';
  imagePreview: string;

  @Input() @Output() plat: Plat;
  @Input() plats: Plat[];
  @Input() categories: Categorie[] = [];

  // constructor(private categorieService: CategorieService) { }

  ngOnInit(): void {
    // this.categories = this.categorieService.categories;
  }

}
