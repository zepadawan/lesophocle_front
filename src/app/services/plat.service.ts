import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categorie } from '../models/categorie-modele';
import { Plat } from '../models/plat-modele';
import { Result } from '../models/result-modele';
import { CategorieService } from './categorie.service';

@Injectable({
  providedIn: 'root'
})
export class PlatService {


  plats: Plat[] = [];
  platSubject = new Subject<Plat[]>();
  //  tableau: Tableau;
  numberOfProductByPage = 9;
  nomberOfPage = 0;

  constructor(private http: HttpClient,
    private categorieService: CategorieService) {
    this.getPlatsFromServer();
  }

  emitPlats() {
    this.platSubject.next(this.plats);
  }

  getPlatsFromServer(): any {
    const url = `${environment.api + 'plats'}`;
    return this.http.get<any>(url).subscribe(
      (data: Result) => {
        this.plats = data.args;
        this.emitPlats();
      },
      (error) => {
        // console.log(error);
      }
    )
  }

  getPlatById(id: number) {
    const url = `${environment.api + 'plats/' + id}`;
    console.log(url);
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (data: Result) => {
          if (data.status == 200) {
            resolve(data);
          } else {
            reject(data.message);
          }
        },
        (err) => {
          reject(err)
        }
      )
    })
  }

  createNewPlat(newPlat: Plat) {
    const url = `${environment.api + 'plats/'}`;
    const body = {
      plat: newPlat
    }
    return new Promise((resolve, reject) => {
      this.http.post(url, newPlat).subscribe(
        (data: Result) => {
          if (data.status == 201) {
            resolve(data.args);
          } else {
            console.log(data.message);
            reject(data.message);
          }
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      )
    })
  }

  deletePlat(id: number) {
    const url = `${environment.api + 'plats/' + id}`;
    return new Promise((resolve, reject) => {
      this.http.delete(url).subscribe(
        (data: Result) => {
          resolve(data)
          this.emitPlats();
        },
        (err) => {
          reject(err);
        }
      )
    })
  }

  updatePlat(id: number, updatePlat: Plat) {
    const url = `${environment.api + 'plats/' + id}`;
    const body = {
      plat: updatePlat
    }
    return new Promise((resolve, reject) => {
      this.http.put(url, body.plat).subscribe(
        (data: Result) => {
          resolve(data);
          this.emitPlats();
        },
        (err) => {
          reject(err);
          console.log(err.message);
        }
      )
    })
  };

  saveImageOnServer(file: File, categName: string) {
    const urlImage = `${environment.api_image}`;
    const url = `${environment.api + 'upload/'}`;
    console.log('url = ' + url);
    console.log(file);
    let formdata: any = new FormData();
    formdata.append("sampleFile", file);
    formdata.append("pathImage", categName);
    this.http.post(url, formdata).subscribe(
      (data: Result) => {
        console.log(data);
      },
      (err) => {
        console.log('erreur ----');
        console.log(err);
      });
  }

  // helpers
  getPathOfImage(id_categorie: number): string {
    var aresult = "";
    this.categorieService.getCategorieNameById(id_categorie)
      .then((data: Categorie) => {
        console.log(data);
        aresult = data.libelle;
      })
      .catch((err) => {
        console.log(err);
      });
    return aresult;
  };

}
