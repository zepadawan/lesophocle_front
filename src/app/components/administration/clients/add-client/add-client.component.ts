import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'node-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  page = "Administration";
  currentpage = "Ajouter un client";
  parentPage = "Clients";
  errorMessage : string;
  successMessage : string;

  clientForm :FormGroup;
  constructor(
    private fb :FormBuilder,
    private clientService : ClientService,
    private router : Router,
  ) {
    this.initForm();

  }

  initForm(){

    const naissancePatern =  "^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$" ;
    this.clientForm = this.fb.group({
      sexe : ['', [Validators.required]],
      lastname : ['', ],
      firstname : ['', ],
      username : ['', ],
      email : ['', Validators.email],
      tel : ['', ],
      adresse : ['', ],
      ville : ['', ],
      cp : ['', ],
      naissance : ['', [Validators.pattern(naissancePatern)]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    const newClient = new Client();

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

    this.clientService.createClient(newClient)
    .then( ()=>{
      this.successMessage = "le Client" + newClient.lastname + "a bien été créé";
      setTimeout(() => {
        this.successMessage = "";
        this.router.navigate(['admin-client'])
        this.clientForm.reset();
        this.clientService.emitClients();
      }, 1000);
    })
    .catch();
  }

  onExit(){
  }


}
