import { Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categorie } from 'src/app/models/categorie-modele';
import { Plat } from 'src/app/models/plat-modele';
import { Result } from 'src/app/models/result-modele';
import { CategorieService } from 'src/app/services/categorie.service';
import { PlatService } from 'src/app/services/plat.service';
import { environment } from 'src/environments/environment';

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

  @Input() htmlText: string;
  imagePreview: string;

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
    private route: ActivatedRoute
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
                poids_dimension: [this.plat.poids_dimension,],
                description: [this.plat.description,],
                htmlText: ['',],
                sous_titre: [this.plat.sous_titre,],
                sampleFile: [this.plat.nom_image,],
              });
              this.imagePreview = `${environment.api_image}` + this.plat.nom_image;
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
      description: ['',],
      htmlText: ['',],
      sous_titre: ['',],
      sampleFile: ['',],

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
    const newPlat = new Plat();
    const idPlat = this.plat.id;
    newPlat.libelle = this.platForm.get('libelle').value;
    newPlat.id_categorie = this.platForm.get('id_categorie').value;
    newPlat.prix = this.platForm.get('prix').value;
    newPlat.poids_dimension = this.platForm.get('poids_dimension').value;
    newPlat.description = this.platForm.get('description').value;

    newPlat.sous_titre = this.platForm.get('sous_titre').value;
    newPlat.nom_image = (this.platForm.get('sampleFile').value).name;

    this.platService.saveImageOnServer(this.platForm.get('sampleFile').value, newPlat.id_categorie);
    this.platService.updatePlat(idPlat, newPlat)
      .then((data) => {
        this.successMessage = 'le  plat : ' + newPlat.libelle + '  est modifié';
        setTimeout(
          () => {
            this.successMessage = null;
          }, 3000);
        this.platForm.reset();
        this.router.navigate(['/administration']);

      })
      .catch();
  }

  onExit() {
    this.platForm.reset();
    this.router.navigate(['/administration']);
  }

}
