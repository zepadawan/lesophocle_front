import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categorie } from '../models/categorie-modele';
import { Result } from '../models/result-modele';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {


  categories: Categorie[] = [];
  categorySubject = new Subject<Categorie[]>();
  categorie: Categorie;

  constructor(private http: HttpClient) {
    this.getCategoriesFromServer();
  }

  emitCategories() {
    this.categorySubject.next(this.categories);
  }

  getCategoriesFromServer() {
    const url = `${environment.api}` + 'categories';
    return new Promise((resolve, reject) => {
      this.http.get<any>(url).subscribe(
        (data: Result) => {
          if (data.status == 200) {
            this.categories = data.args;
          }
          this.emitCategories();
        },
        (err) => {
          // console.log(err);
        }
      )
    })
  };

  getCategoryNameById(id: number) {
    const url = `${environment.api + 'categories/' + id}`;
    console.log(url);
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (data: Result) => {
          if (data.status == 200) {
            this.categorie = data.args;
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
