import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categorie-modele';
import { CategorieService } from 'src/app/services/categorie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'node-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  refApiImage = environment.api_image;
  constructor(
    private categorieService: CategorieService,) { }

  ngOnInit(): void {
  }

}