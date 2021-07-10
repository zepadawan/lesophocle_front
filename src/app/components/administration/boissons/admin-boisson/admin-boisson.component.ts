import { Component, OnInit } from '@angular/core';
import { Boisson } from 'src/app/models/boisson.model';
import { Result } from 'src/app/models/result-modele';
import { BoissonService } from 'src/app/services/boisson.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'node-admin-boisson',
  templateUrl: './admin-boisson.component.html',
  styleUrls: ['./admin-boisson.component.css']
})
export class AdminBoissonComponent implements OnInit {

  boissons : Boisson[] = [];
  isAdmin : Boolean ;

  constructor(private boissonService :BoissonService,
    private userService : UserService) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin;
    this.isAdmin = true;
    this.boissonService.getAllBoissons()
    .then( (datas: Result)=>{
      this.boissons = datas.args;
    })
    .catch();

  }

}
