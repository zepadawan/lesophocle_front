import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categorie } from 'src/app/models/categorie-modele';
import { Plat } from 'src/app/models/plat-modele';
import { User } from 'src/app/models/user-modele';
import { CategorieService } from 'src/app/services/categorie.service';
import { PlatService } from 'src/app/services/plat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'node-admin-plat',
  templateUrl: './admin-plat.component.html',
  styleUrls: ['./admin-plat.component.css']
})
export class AdminPlatComponent implements OnInit {

  plats: Plat[] = [];
  platSubscription: Subscription;

  platType: string;
  user: User;
  isAdmin = true;
  categName: string;
  // isAdmin = false;

  constructor(private platService: PlatService,
    private route: ActivatedRoute,
    private router: Router,
    private categorieService: CategorieService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.plats = this.platService.getPlatsFromServer();
    this.route.params.subscribe(
      (request) => {
        this.platSubscription = this.platService.platSubject.subscribe(
          (data: Plat[]) => {
            const tabs = data.filter(plat => {
              return plat.id_categorie == +request.id;
            });
            this.plats = tabs.sort((a, b) => a.ordre - b.ordre);
            this.categorieService.getCategorieNameById(+request.id)
              .then((data: Categorie) => {
                this.platType = data.libelle;
              })
              .catch();
          }
        );
        this.platService.emitPlats();
      }
    );
  }

  getLibelleCategorie(id: number): string {
    this.categorieService.getCategorieNameById(id)
      .then((data: string) => {
        this.categName = data;
      })
      .catch();
    return '';
  }

  ngOnDestroy() {
    this.platSubscription.unsubscribe();
  }

}

