import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/models/categorie-modele';
import { Plat } from 'src/app/models/plat-modele';
import { Result } from 'src/app/models/result-modele';
import { CategorieService } from 'src/app/services/categorie.service';
import { PlatService } from 'src/app/services/plat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'node-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit {

  image: string;
  plat: Plat;
  refApiImage = `${environment.api_image}` + '/';
  pathImage: string;
  categName: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private platService: PlatService,
    private categorieService: CategorieService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.platService.getPlatById(params.id)
        .then(
          (data: Result) => {
            this.plat = data.args
            this.categorieService.getCategorieNameById(this.plat.id_categorie)
              .then((data: Categorie) => {
                this.categName = data.pathImage;
                this.image = `${environment.api_image}` + this.categName + '/' + this.plat.nom_image;
              })
              .catch();
          }
        )
        .catch();
    })
  }

  onClose() {
    this.router.navigate(['/laCarte/' + this.plat.id_categorie]);
  }
}
