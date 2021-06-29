import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Evenement } from 'src/app/models/evenement.model';
import { Result } from 'src/app/models/result-modele';
import { EvenementService } from 'src/app/services/evenement.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'node-edit-concert',
  templateUrl: './edit-concert.component.html',
  styleUrls: ['./edit-concert.component.css']
})
export class EditConcertComponent implements OnInit, OnDestroy {

  page = "Administration";
  currentpage = "Modifier un concert";
  parentPage = "Concerts";
  errorMessage : string;
  successMessage : string;

  concertForm : FormGroup;
  concertSubscription : Subscription;

  imagePreview : string;
  concert : Evenement;

  constructor( private fb: FormBuilder,
    private evenementService :EvenementService,
    private route : ActivatedRoute,
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
    const url = environment.api;
    this.concertSubscription = this.route.params.subscribe(
      (params: Params)=>{
        const aId = params.id;
        this.evenementService.getEvenementById(aId)
        .then( (data:Result)=>{
          this.concert = data.args;
          this.concertForm = this.fb.group({
            date : [this.concert.date, []],
            prix : [this.concert.prix, []],
            heuredebut : [this.concert.heuredebut, []],
            heurefin : [this.concert.heurefin, []],
            dinerdebut : [this.concert.dinerdebut, []],
            nbpersmax : [this.concert.nbpersmax, []],
            description : [this.concert.description, []],
            infosup : [this.concert.infossup, []],
            sampleFile : [this.concert.image, []],
          });
          const pathPreview = `${environment.api_image}` +'Evenements/' + this.concert.image;
          this.imagePreview = pathPreview;
      })
        .catch();
      }
    )
  }

  ngOnDestroy(): void {
    this.concertSubscription.unsubscribe();
  }

  onSubmit(){
    const newConcert = new Evenement();
    const id = this.concert.id
    newConcert.date  = this.concertForm.get('date').value;
    newConcert.prix  = this.concertForm.get('prix').value;
    newConcert.heuredebut  = this.concertForm.get('heuredebut').value;
    newConcert. heurefin  = this.concertForm.get('heurefin').value;
    newConcert.dinerdebut  = this.concertForm.get('dinerdebut').value;
    newConcert.nbpersmax = this.concertForm.get('nbpersmax').value;
    newConcert.description  = this.concertForm.get('description').value;
    newConcert.infossup  = this.concertForm.get('infosup').value;
    newConcert.image  = this.concertForm.get('sampleFile').value;

    if (this.concertForm.get('sampleFile').value) {
      newConcert.image = (this.concertForm.get('sampleFile').value).name;
      this.evenementService.saveImageOnServer(this.concertForm.get('sampleFile').value);
    }

    this.evenementService.updateEvenement(id,newConcert)
    .then( (data) => {
      this.successMessage = 'Le concert a bien été modifié !';
      setTimeout(() => {
        this.successMessage = '';
        this.concertForm.reset();
        this.router.navigate(['admin-concert']);
      }, 1000);
    })
    .catch();

  }

  onExit(){
    this.router.navigate(['/administration'])
  }

}
