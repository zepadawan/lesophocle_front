import { Component, Input, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categorie } from 'src/app/models/categorie-modele';
import { Plat } from 'src/app/models/plat-modele';
import { CategorieService } from 'src/app/services/categorie.service';
import { PlatService } from 'src/app/services/plat.service';

@Component({
  selector: 'node-add-plat',
  templateUrl: './add-plat.component.html',
  styleUrls: ['./add-plat.component.css']
})

export class AddPlatComponent implements OnInit {

  platForm: FormGroup;
  currentCategorie: number;
  errorMessage: string;
  successMessage: string = 'Saisir';
  categories: Categorie[] = [];
  categName: string;

  @Input() htmlText: string;
  imagePreview: string;

  plats: Plat[] = [];
  platSubscription: Subscription;
  page = "Administration";
  currentpage = "Ajouter un plat";
  parentPage = "Plat";

  constructor(private platService: PlatService,
    private categorieService: CategorieService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categories = this.categorieService.categories;

    this.initFormBuilder();
    this.platSubscription = this.platService.platSubject.subscribe(
      (data) => {
        this.plats = this.platService.plats;
      }
    )
    this.platService.emitPlats();

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
    newPlat.libelle = this.platForm.get('libelle').value;
    newPlat.id_categorie = this.platForm.get('categorie').value;
    this.currentCategorie = newPlat.id_categorie;
    newPlat.prix = this.platForm.get('prix').value;
    newPlat.poids_dimension = this.platForm.get('poids_dimension').value;
    newPlat.description = this.platForm.get('description').value;
    newPlat.sous_titre = this.platForm.get('sous_titre').value;
    newPlat.ordre = this.platForm.get('ordre').value;
    newPlat.allergenes = this.platForm.get('allergenes').value;

    if (this.platForm.get('sampleFile').value) {
      newPlat.nom_image = (this.platForm.get('sampleFile').value).name;
    }

    if (this.platForm.get('sampleFile').value) {
      this.categorieService.getCategorieNameById(newPlat.id_categorie)
        .then((data: Categorie) => {
          this.categName = data.pathImage;
          this.platService.saveImageOnServer(this.platForm.get('sampleFile').value, this.categName);
        })
        .catch();

    }
    this.platService.createNewPlat(newPlat)
      .then((data) => {
        this.successMessage = 'le nouveau plat : ' + newPlat.libelle + '  est enregistr??';
        setTimeout(
          () => {
            this.successMessage = null;
            this.platForm.reset();
            this.router.navigate(['/admin-plat/' + this.currentCategorie]);
          }, 1000);

      })
      .catch();
  }


  onExit() {
    this.platForm.reset();
    this.router.navigate(['/administration']);
  }


}
