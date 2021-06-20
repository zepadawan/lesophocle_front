import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MenuJour } from 'src/app/models/menujour';
import { Result } from 'src/app/models/result-modele';
import { MenujourService } from 'src/app/services/menujour.service';
import { TextesService } from 'src/app/services/textes.service';


@Component({
  selector: 'node-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {


  page = "Administration";
  currentpage = "Modifier Le Menu du Jour";
  parentPage = "Menu du Jour";

  platForm: FormGroup;
  menuJour: MenuJour;

  successMessage: string;
  errorMessage: string;

  pagesSelector: string[] = []
  @Input() htmlText: string;


  constructor(private fb: FormBuilder,
    private menujourService: MenujourService,
    private router: Router
  ) {
    this.initFormGroup();
  }

  ngOnInit(): void {
    this.menujourService.getMenuJour()
      .then((data: Result) => {
        console.log('data tt ', data);
        this.menuJour = data.args;
        this.platForm = this.fb.group({
          prixdujour: [this.menuJour.prixdujour,],
          menuviande: [this.menuJour.menuviande, [Validators.required]],
          menupoisson: [this.menuJour.menupoisson, [Validators.required]],
          prixformule: [this.menuJour.prixformule, [Validators.required]],
          prixmenu: [this.menuJour.prixmenu, [Validators.required]],
          libellesugg1: [this.menuJour.libellesugg1, []],
          prixsugg1: [this.menuJour.prixsugg1, []],
          descsugg1: [this.menuJour.descsugg1, []],
        })
      })
      .catch();
  }

  initFormGroup() {
    this.platForm = this.fb.group({
      prixdujour: ['', [Validators.required]],
      menuviande: ['', [Validators.required]],
      menupoisson: ['', [Validators.required]],
      prixformule: ['', [Validators.required]],
      prixmenu: ['', [Validators.required]],
      libellesugg1: ['',],
      prixsugg1: ['',],
      descsugg1: ['',],

    });
  }
  onSubmit() {
    const newMenujour = new MenuJour();
    const id = this.menuJour.id;
    newMenujour.prixdujour = this.platForm.get('prixdujour').value;
    newMenujour.menuviande = this.platForm.get('menuviande').value;
    newMenujour.menupoisson = this.platForm.get('menupoisson').value;
    newMenujour.prixformule = this.platForm.get('prixformule').value;
    newMenujour.prixmenu = this.platForm.get('prixmenu').value;
    newMenujour.libellesugg1 = this.platForm.get('libellesugg1').value;
    newMenujour.prixsugg1 = this.platForm.get('prixsugg1').value;
    newMenujour.descsugg1 = this.platForm.get('descsugg1').value;

    this.menujourService.updateMenuJour(id, newMenujour)
      .then(
        () => {
          this.successMessage = 'La modification est OK !';
          setTimeout(
            () => {
              this.successMessage = null;
              this.platForm.reset();
              this.router.navigate(['/menujour']);
            }, 1000);
        }
      )
      .catch(
        (err) => {
          this.errorMessage = err.message;
        }
      );
    this.menujourService.emitMenuJour();
  }



}

