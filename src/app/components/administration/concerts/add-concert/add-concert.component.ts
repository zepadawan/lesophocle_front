import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Evenement } from 'src/app/models/evenement.model';
import { EvenementService } from 'src/app/services/evenement.service';

@Component({
  selector: 'node-add-concert',
  templateUrl: './add-concert.component.html',
  styleUrls: ['./add-concert.component.css']
})
export class AddConcertComponent implements OnInit {

  page = "Administration";
  currentpage = "Ajouter un concert";
  parentPage = "Concerts";
  errorMessage : string;
  successMessage : string;

  concertForm : FormGroup;

  constructor( private fb: FormBuilder,
     private evenementService :EvenementService,
     private router : Router) {
       this.initConcertForm();
      }

      initConcertForm() {
      this.concertForm = this.fb.group({
        date : ['', []],
        prix : ['', []],
        heuredebut : ['', []],
        heurefin : ['', []],
        dinerdebut : ['', []],
        nbpersmax : ['', []],
        description : ['', []],
        infosup : ['', []],
        sampleFile : ['', []],
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    const newConcert = new Evenement();

    newConcert.date  = this.concertForm.get('date').value;
    newConcert.prix  = this.concertForm.get('prix').value;
    newConcert.heuredebut  = this.concertForm.get('heuredebut').value;
    newConcert. heurefin  = this.concertForm.get('heurefin').value;
    newConcert.dinerdebut  = this.concertForm.get('dinerdebut').value;
    newConcert.nbpersmax = this.concertForm.get('nbpersmax').value;
    newConcert.description  = this.concertForm.get('description').value;
    newConcert.infossup  = this.concertForm.get('infosup').value;
    newConcert.image  = this.concertForm.get('sampleFile').value;

    this.evenementService.creatEvenement(newConcert)
    .then( (data)=>{
      this.successMessage = " L'ajout du concert = OK !";
      setTimeout(() => {
        this.successMessage = "";
        this.evenementService.emitEvenements();
        this.router.navigate(['admin-concert'])

      }, 1000);
    })
    .catch();
  }
  onExit(){

  }
}
