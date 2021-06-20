import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuJour } from '../models/menujour';
import { Result } from '../models/result-modele';

@Injectable({
  providedIn: 'root'
})
export class MenujourService {

  menuJour: MenuJour;
  menujourSubject = new Subject<MenuJour>();
  constructor(private http: HttpClient) {
    this.getMenuJour();
  }

  emitMenuJour() {
    this.menujourSubject.next(this.menuJour);
  }

  getMenuJour() {
    const url = environment.api + 'menujour/' + '1';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (data: Result) => {
          this.menuJour = data.args;
          this.emitMenuJour();
          resolve(data);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      )
      this.emitMenuJour();

    });
  }


  updateMenuJour(id: number, menuJour: MenuJour) {
    const url = `${environment.api + 'menujour/' + id}`;
    console.log(menuJour);
    return new Promise((resolve, reject) => {
      this.http.put(url, menuJour).subscribe(
        (data: Result) => {
          resolve(data);
          console.log('Update OK !');
          this.emitMenuJour();
        },
        (err) => {
          reject(false);
        })
    })
  };


}
