import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categorie } from 'src/app/models/categorie-modele';
import { Plat } from 'src/app/models/plat-modele';
import { Result } from 'src/app/models/result-modele';
import { CategorieService } from 'src/app/services/categorie.service';
import { PlatService } from 'src/app/services/plat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'node-show-plat',
  templateUrl: './show-plat.component.html',
  styleUrls: ['./show-plat.component.css']
})
export class ShowPlatComponent implements OnInit, OnDestroy {


  imagePreview: string;
  categName: string;
  platSubscription: Subscription;

  @Input() plat: Plat;

  constructor(private route: ActivatedRoute,
    private platService: PlatService,
    private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.platSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.platService.getPlatById(params.id)
          .then(
            (data: Result) => {
              const tab = data.args;
              this.plat = data.args;
              this.categorieService.getCategorieNameById(tab.id_categorie)
                .then((data: Categorie) => {
                  this.categName = data.pathImage;
                  this.imagePreview = `${environment.api_image}` + this.categName + '/' + tab.nom_image;
                })
                .catch();
            }
          )
          .catch();
      }
    )
  };

  ngOnDestroy() {
    this.platSubscription.unsubscribe();

  }
  onExit() {

  }


}
