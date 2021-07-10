import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Boisson } from 'src/app/models/boisson.model';
import { CategorieBoisson } from 'src/app/models/categorieBoisoon.model';

@Component({
  selector: 'node-custom-boisson',
  templateUrl: './custom-boisson.component.html',
  styleUrls: ['./custom-boisson.component.css']
})
export class CustomBoissonComponent implements OnInit {

  @Input() boissonForm :  FormGroup;

  boisson : Boisson;
  @Input() categoriesBoisson : CategorieBoisson[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
