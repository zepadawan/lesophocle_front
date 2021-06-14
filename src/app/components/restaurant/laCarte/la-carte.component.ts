import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categorie } from 'src/app/models/categorie-modele';
import { Plat } from 'src/app/models/plat-modele';
import { User } from 'src/app/models/user-modele';
import { CategorieService } from 'src/app/services/categorie.service';
import { PlatService } from 'src/app/services/plat.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'node-la-carte',
  templateUrl: './la-carte.component.html',
  styleUrls: ['./la-carte.component.css']
})
export class LaCarteComponent implements OnInit {

  plats: Plat[] = [];
  platSubscription: Subscription;

  platType: string;
  pathImage: string;
  user: User;
  isAdmin = true;
  urlImage = environment.api_image;
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
                this.pathImage = data.pathImage;
              })
              .catch();
          }
        );
        this.platService.emitPlats();
      }
    );
  }

  ngOnDestroy() {
    this.platSubscription.unsubscribe();
  }

}
