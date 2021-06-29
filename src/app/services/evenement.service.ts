import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result-modele';
import { Client } from '../models/client.model'
import { Evenement } from '../models/evenement.model';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  evenements: Evenement[] = [];
  evenement: Evenement;
  isAuth: boolean = false;
  isAdmin: boolean = false;
  isSuperAdmin: boolean = false;

  evenementSubject = new Subject<Evenement[]>();
  evenementId: number;
  token = "";
  role: string;
  url = `${environment.api}` + 'evenements/';


  constructor(private http: HttpClient) {
    this.getAllEvenements();
  }

  emitEvenements(): void {
    this.evenementSubject.next(this.evenements);
  }

  getAllEvenements() {
    return new Promise((resolve, reject) => {
      this.http.get(this.url).subscribe(
        (datas: Result) => {
          this.evenements = datas.args;
          resolve(datas)
        },
        (err) => {
          reject(err);
        }
      )
    })
  };

  getEvenementById(id: number) {
    const url = this.url + id
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (data: Result) => {
          this.evenement = data.args;
          resolve(data)
        },
        (err) => {
          reject(err);
        }
      )
    })
  }

  creatEvenement(newEvenement: Evenement) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url, newEvenement).subscribe(
        (data) => {
          resolve(data);
          this.emitEvenements();
        },
        (err) => {
          reject(err);
        }
      )
    })
  }

  updateEvenement(id: number, evenement: Evenement) {
    const url = this.url + id;
    return new Promise((resolve, reject) => {
      this.http.put(url, evenement).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      )
    })
  }

  deleteEvenement(id: number) {
    const url = this.url + id;
    return new Promise((resolve, reject) => {
      this.http.delete(url).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      )
    })
  }

  saveImageOnServer(file: File) {
    const urlImage = `${environment.api_image}`;
    const url = `${environment.api + 'upload/'}`;
    let formdata: any = new FormData();
    formdata.append("sampleFile", file);
    formdata.append("pathImage", "Evenements");
    this.http.post(url, formdata).subscribe(
      (data: Result) => {
      },
      (err) => {
      });
  }

  logOut(): void {
    this.evenement = null;
    this.isAuth = false;
    this.isAdmin = false;
    this.isSuperAdmin = false;
    this.evenementSubject = new Subject< Evenement[]>();
  }
}
