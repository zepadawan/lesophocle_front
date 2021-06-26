import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { Result } from 'src/app/models/result-modele';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'node-admin-client',
  templateUrl: './admin-client.component.html',
  styleUrls: ['./admin-client.component.css']
})
export class AdminClientComponent implements OnInit {

  clients : Client[]=[];
  isAdmin : boolean;
  constructor( private clientService :ClientService,
    private userService : UserService) {
    }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin;
    this.isAdmin = true;
    this.clientService.getAllClients()
    .then((datas:Result)=>{
      this.clients = datas.args;
    })
    .catch();

  }

}
