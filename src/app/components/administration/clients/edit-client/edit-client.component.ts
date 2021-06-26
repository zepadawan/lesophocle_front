import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { Result } from 'src/app/models/result-modele';
import { ClientService } from 'src/app/services/client.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'node-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit, OnDestroy {

  client : Client;
  clientForm :FormGroup;
  clientSubscription : Subscription;

  page = "Administration";
  currentpage = "Editer un client";
  parentPage = "Clients";
  errorMessage : string;
  successMessage : string;

  naissancePatern =  "^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$" ;


  constructor(
    private fb :FormBuilder,
    private clientService : ClientService,
    private route: ActivatedRoute,
    private router : Router,

  ) {
   this.initForm();

  }

  initForm(){
    const naissancePatern =  "^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$" ;
    this.clientForm = this.fb.group({
      sexe : ['',],
      lastname : ['', ],
      firstname : ['', ],
      username : ['', ],
      email : ['',],
      tel : ['', ],
      adresse : ['', ],
      ville : ['', ],
      cp : ['', ],
      naissance : ['', ],
    });
  }

  ngOnInit(): void {
    const url = environment.api;
    this.clientSubscription = this.route.params.subscribe(
      (params : Params) =>{
        const id = params.id;
        this.clientService.getClientById(id)
        .then( (result :Result) =>{
          console.log(result.args);

          this.client = result.args;
          this.clientForm = this.fb.group({
            sexe : [this.client.sexe, ],
            lastname : [this.client.lastname, [] ],
            firstname : [this.client.firstname,  [] ],
            username : [this.client.username, []  ],
            email : [this.client.email, Validators.email],
            tel : [this.client.tel, []  ],
            adresse : [ this.client.adresse,  [] ],
            ville : [this.client.ville,  []  ],
            cp : [ this.client.cp ,  []  ],
            naissance : [this.client.naissance,  [] ],
          })
        })
        .catch();
      }
    )
 };

 ngOnDestroy(): void {
  this.clientSubscription.unsubscribe();
 }

  onSubmit(){
    const newClient = new Client();
    const id = this.client.id;
    newClient.sexe = this.clientForm.get('sexe').value;
    newClient.lastname = this.clientForm.get('lastname').value;
    newClient.firstname = this.clientForm.get('firstname').value;
    newClient.username = this.clientForm.get('username').value;
    newClient.email = this.clientForm.get('email').value;
    newClient.tel = this.clientForm.get('tel').value;
    newClient.adresse = this.clientForm.get('adresse').value;
    newClient.ville = this.clientForm.get('ville').value;
    newClient.cp = this.clientForm.get('cp').value;
    newClient.naissance = this.clientForm.get('naissance').value;
    console.log(newClient);


    this.clientService.updateClient(id, newClient)
    .then( ()=>{
      this.successMessage = "le Client" + newClient.lastname + "a bien été modifié";
      setTimeout(() => {
        this.successMessage = "";
        this.router.navigate(['admin-client'])
        this.clientForm.reset();
        this.clientService.emitClients();
      }, 1000);
    })
    .catch();
  }

  onExit(
  ){
    this.router.navigate(['/administration'])
  }

}
