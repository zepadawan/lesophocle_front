import { Component, OnInit } from '@angular/core';
import { Evenement } from 'src/app/models/evenement.model';
import { Result } from 'src/app/models/result-modele';
import { EvenementService } from 'src/app/services/evenement.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'node-admin-concert',
  templateUrl: './admin-concert.component.html',
  styleUrls: ['./admin-concert.component.css']
})
export class AdminConcertComponent implements OnInit {


  evenements : Evenement[]=[];
  isAdmin : boolean;
  constructor( private evenementService : EvenementService,
    private userService : UserService) {
    }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin;
    this.isAdmin = true;
    this.evenementService.getAllEvenements()
    .then((datas:Result)=>{
      this.evenements = datas.args;
    })
    .catch();

  }
}
