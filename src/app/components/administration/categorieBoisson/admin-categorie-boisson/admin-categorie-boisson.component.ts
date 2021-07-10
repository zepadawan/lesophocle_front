import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategorieBoisson } from 'src/app/models/categorieBoisoon.model';

@Component({
  selector: 'node-admin-categorie-boisson',
  templateUrl: './admin-categorie-boisson.component.html',
  styleUrls: ['./admin-categorie-boisson.component.css']
})
export class AdminCategorieBoissonComponent implements OnInit {

  categories: CategorieBoisson[] = [];
  isAdmin: boolean = true;
  categSubsciption: Subscription;
  constructor() { }

  ngOnInit(): void {
  }

}
