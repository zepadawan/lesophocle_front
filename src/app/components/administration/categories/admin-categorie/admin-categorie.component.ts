import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Categorie } from 'src/app/models/categorie-modele';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'node-admin-categorie',
  templateUrl: './admin-categorie.component.html',
  styleUrls: ['./admin-categorie.component.css']
})
export class AdminCategorieComponent implements OnInit {

  categories: Categorie[] = [];
  isAdmin: boolean = true;
  categSubsciption: Subscription;

  constructor(private categorieService: CategorieService) { }

  ngOnInit(): void {

    this.categorieService.getCategoriesFromServer()
      .then((result: Categorie[]) => {
        this.categories = result;
      }).catch((err) => {

      });
  };

}





