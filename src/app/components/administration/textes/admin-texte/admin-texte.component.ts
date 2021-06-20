import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Texte } from '../../../../models/texte';
import { TextesService } from '../../../../services/textes.service';

@Component({
  selector: 'node-admin-texte',
  templateUrl: './admin-texte.component.html',
  styleUrls: ['./admin-texte.component.css']
})
export class AdminTexteComponent implements OnInit, OnDestroy {

  currentpage = "Gestion des textes";
  parentPage = "Textes";
  page = "Administration";

  textes: Texte[] = [];
  texteSubscription: Subscription;
  constructor(private textesService: TextesService) { }

  ngOnInit(): void {
    this.textesService.getTextesFromServer();
    this.texteSubscription = this.textesService.textesubject.subscribe(
      (data) => {
        this.textes = data;
      }
    )
    this.textesService.emitTextes();
  }

  ngOnDestroy() {
    this.texteSubscription.unsubscribe();
  }

}
