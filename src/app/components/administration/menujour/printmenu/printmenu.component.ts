import { Component, OnInit } from '@angular/core';
import { MenuJour } from 'src/app/models/menujour';
import { Result } from 'src/app/models/result-modele';
import { MenujourService } from 'src/app/services/menujour.service';

@Component({
  selector: 'node-printmenu',
  templateUrl: './printmenu.component.html',
  styleUrls: ['./printmenu.component.css']
})
export class PrintmenuComponent implements OnInit {

  menuJour: MenuJour;
  jour: string;

  constructor(private menujourService: MenujourService) { }

  ngOnInit(): void {
    const ladate = new Date();
    this.jour = (ladate.getDate() + "/" + (ladate.getMonth() + 1) + "/" + ladate.getFullYear())
    console.log(this.jour);

    this.menujourService.getMenuJour()
      .then(
        (data: Result) => {
          console.log('data', data);
          this.menuJour = data.args;
        })
      .catch(
        (err) => {
          console.log('err', err);
        }
      );
  }

}
