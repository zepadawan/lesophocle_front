import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Texte } from 'src/app/models/texte';
import { TextesService } from 'src/app/services/textes.service';

@Component({
  selector: 'node-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  page = "Administration";
  currentpage = "Créer Le Menu du Jour";
  parentPage = "Menu du Jour";

  platForm: FormGroup;
  texte = new Texte();

  successMessage: string;
  errorMessage: string;

  pagesSelector: string[] = []
  @Input() htmlText: string;


  constructor(private fb: FormBuilder,
    private texteService: TextesService,
    private router: Router,
    private route: ActivatedRoute) {
    this.initFormGroup();
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.texteService.getTexteNameById(params.id)
          .then((data: Texte) => {
            this.texte = data;
            this.platForm = this.fb.group({
              prixdujour: ['',],
              menuviande: ['',],
              menupoisson: ['',],
              prixformule: ['',],
              prixmenu: ['',],
              libellesugg1: ['',],
              prixsugg1: ['',],
              descsugg1: ['',],
            })
          })
          .catch();
      }
    )

  }

  initFormGroup() {
    this.platForm = this.fb.group({
      prixdujour: ['',],
      menuviande: ['',],
      menupoisson: ['',],
      prixformule: ['',],
      prixmenu: ['',],
      libellesugg1: ['',],
      prixsugg1: ['',],
      descsugg1: ['',],
    });
  }
}