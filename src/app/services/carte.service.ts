import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carte } from '../models/carte.model';
import { Result } from '../models/result-modele';

@Injectable({
  providedIn: 'root'
})
export class CarteService {
  cartes: Carte[] = [];
  carteSubject = new Subject<Carte[]>();
  carte: Carte;

  constructor(private http: HttpClient) {
    this.getCartesFromServer();
  }

  emitCartes() {
    this.carteSubject.next(this.cartes);
  }

  getCartesFromServer() {
    const url = `${environment.api}` + 'cartes';
    return new Promise((resolve, reject) => {
      this.http.get<any>(url).subscribe(
        (data: Result) => {
          if (data.status == 200) {
            this.cartes = data.args;
            resolve(data.args)
          }
          this.emitCartes();
        },
        (err) => {
          reject(false)
        }
      )
    })
  };

  getCarteNameById(id: number) {
    const url = `${environment.api + 'cartes/' + id}`;
    console.log(url);
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (data: Result) => {
          if (data.status == 200) {
            this.carte = data.args;
            resolve(data.args);
          } else {
            reject(data.message);
          }
        },
        (err) => {
          console.log(err);

        }
      )
    })

  };
}
