import { HttpClient } from '@angular/common/http';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
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
    console.log(url);

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
    const url = `${environment.api + 'plat/register'}`;
    console.log(url);

    const body = {
      plat: newPlat
    }

    return new Promise((resolve, reject) => {
      this.http.post(url, body).subscribe(
        (data: Result) => {
          console.log(data);
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

  updatePlat(id: number, updatePlat: Plat) {
    const url = `${environment.api + 'oeuvres/' + id}`;
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
  }

  // Afficahege par pages => Pagination
  // getProductbyPage(numberPage: number): Tableau[] {

  //   this.nomberOfPage = Math.trunc(this.tableaux.length / this.numberOfProductByPage);
  //   if (numberPage > 0 || numberPage <= (this.nomberOfPage)) {
  //     const prodResult = this.tableaux.slice(numberPage * this.numberOfProductByPage, (numberPage + 1) * this.numberOfProductByPage);
  //     return prodResult;
  //   }
  //   return null;

  // }

  saveImageOnServer(file: File, id_categorie: number) {
    const urlImage = `${environment.api_image}`;
    const apath = this.getPathOfImage(id_categorie);

    const url = `${environment.api + 'upload' + id_categorie}`;
    console.log('url = ' + url);
    console.log(file);
    let formdata: any = new FormData();
    formdata.append("sampleFile", file)
    console.log('file = ' + file);


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
    this.categorieService.getCategoryNameById(id_categorie)
      .then((data: string) => {
        console.log(data);
        aresult = data;
      })
      .catch((err) => {
        console.log(err);

      });



    return aresult;



  }
}
