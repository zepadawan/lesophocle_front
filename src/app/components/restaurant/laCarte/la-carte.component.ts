import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { Subscription } from 'rxjs';
import { reduce } from 'rxjs/operators';
import { Categorie } from 'src/app/models/categorie-modele';
import { Plat } from 'src/app/models/plat-modele';
import { User } from 'src/app/models/user-modele';
import { CategorieService } from 'src/app/services/categorie.service';
import { PlatService } from 'src/app/services/plat.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { MessagesComponent } from '../../administration/messages/messages.component';
import { ModalComponent } from '../../administration/modal/modal.component';

@Component({
  selector: 'node-la-carte',
  templateUrl: './la-carte.component.html',
  styleUrls: ['./la-carte.component.css']
})
export class LaCarteComponent implements OnInit {

  plats: Plat[] = [];
  platSubscription: Subscription;

  platType: string;
  apathImage;
  user: User;
  isAdmin = true;
  urlImage: string;
  bpath: string = "";

  constructor(private platService: PlatService,
    private route: ActivatedRoute,
    private router: Router,
    private categorieService: CategorieService,
    private dialog: MatDialog,
    private userService: UserService) { }

  ngOnInit(): void {
    this.urlImage = `${environment.api_image}`;
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
                this.bpath = data.pathImage;
                this.urlImage = `${environment.api_image}` + this.bpath + "/";
                this.platType = data.libelle;
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

  editAllergenes() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      height: '600px',
      backdropClass: 'backdropBackground', // This is the "wanted" line
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }



}
