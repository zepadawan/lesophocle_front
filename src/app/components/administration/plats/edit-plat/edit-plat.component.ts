import { Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categorie } from 'src/app/models/categorie-modele';
import { Plat } from 'src/app/models/plat-modele';
import { Result } from 'src/app/models/result-modele';
import { CategorieService } from 'src/app/services/categorie.service';
import { PlatService } from 'src/app/services/plat.service';
import { environment } from 'src/environments/environment';
import { MessagesComponent } from '../../messages/messages.component';

@Component({
  selector: 'node-edit-plat',
  templateUrl: './edit-plat.component.html',
  styleUrls: ['./edit-plat.component.css']
})
export class EditPlatComponent implements OnInit, OnDestroy {

  platForm: FormGroup;
  errorMessage: string;
  successMessage: string = 'Modifier';
  categories: Categorie[] = [];
  categName: string;
  currentCategorie: number;

  @Input() htmlText: string;
  imagePreview: string;
  pathPreview = null;

  plat: Plat;
  plats: Plat[] = [];
  platSubscription: Subscription;

  page = "Administration";
  currentpage = "Editer un plat";
  parentPage = "Plat";


  constructor(private platService: PlatService,
    private categorieService: CategorieService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.categories = this.categorieService.categories;
    this.initFormBuilder();
    this.platSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.platService.getPlatById(params.id)
          .then(
            (data: Result) => {
              this.plat = data.args
              const tab = data.args;
              this.platForm = this.fb.group({
                libelle: [this.plat.libelle, [Validators.required]],
                categorie: [this.plat.id_categorie, [Validators.required]],
                prix: [this.plat.prix, [Validators.required]],
                ordre: [this.plat.ordre,],
                allergenes: [this.plat.allergenes,],
                poids_dimension: [this.plat.poids_dimension,],
                description: [this.plat.description,],
                htmlText: ['',],
                sous_titre: [this.plat.sous_titre,],
                sampleFile: [this.plat.nom_image,],
                actif: [this.plat.actif,],
              });
              this.currentCategorie = this.plat.id_categorie;
              this.categorieService.getCategorieNameById(this.plat.id_categorie)
                .then((data: Categorie) => {
                  this.categName = data.pathImage;
                  this.pathPreview = `${environment.api_image}` + this.categName + '/' + this.plat.nom_image;
                  this.imagePreview = this.pathPreview;
                })
                .catch();


            }
          )
          .catch();
      }
    )
  };

  ngOnDestroy(): void {
    this.platSubscription.unsubscribe();
  }

  initFormBuilder() {
    this.platForm = this.fb.group({
      libelle: ['', [Validators.required]],
      categorie: ['', [Validators.required]],
      prix: ['', [Validators.required]],
      ordre: ['',],
      poids_dimension: ['',],
      allergenes: ['',],
      description: ['',],
      htmlText: ['',],
      sous_titre: ['',],
      sampleFile: ['',],
      actif: ['',],

    });
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.platForm.get('sampleFile').patchValue(file);
    this.platForm.get('sampleFile').updateValueAndValidity();
    const reader = new FileReader();

    reader.onloadend = () => {
      if (this.platForm.get('sampleFile').valid) {
        this.imagePreview = (reader.result as string);
      } else {
        this.imagePreview = null;
      }
    }
    reader.readAsDataURL(file);
  }

  onSubmit() {

    this.dialog.open(MessagesComponent, { data: { message: "Error  !" } });
    setTimeout(() => {

    }, 4000);
    const newPlat = new Plat();
    const idPlat = this.plat.id;
    newPlat.libelle = this.platForm.get('libelle').value;
    newPlat.id_categorie = this.platForm.get('categorie').value;
    newPlat.prix = this.platForm.get('prix').value;
    newPlat.allergenes = this.platForm.get('allergenes').value;
    newPlat.poids_dimension = this.platForm.get('poids_dimension').value;
    newPlat.description = this.platForm.get('description').value;
    newPlat.sous_titre = this.platForm.get('sous_titre').value;
    newPlat.ordre = this.platForm.get('ordre').value;
    newPlat.actif = this.platForm.get('actif').value;

    if (this.platForm.get('sampleFile').value) {
      newPlat.nom_image = (this.platForm.get('sampleFile').value).name;
      this.platService.saveImageOnServer(this.platForm.get('sampleFile').value, this.categName);
    }

    this.platService.updatePlat(idPlat, newPlat)
      .then((data) => {
        this.successMessage = 'le  plat : ' + newPlat.libelle + '  est modifié';
        setTimeout(
          () => {
            this.successMessage = null;
            this.platForm.reset();
            this.router.navigate(['/admin-plat/' + this.currentCategorie]);
            this.platService.emitPlats();
          }, 1000);
      })
      .catch();
  }

  onExit() {
    this.platForm.reset();
    this.router.navigate(['/accueil']);
  }

  onDelete() {
    this.platService.deletePlat(this.plat.id)
      .then(() => {
        this.router.navigate(['/admin-plat/' + this.currentCategorie]);
      })
      .catch();
  }

}
