import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategorieBoisson } from '../models/categorieBoisoon.model';
import { Result } from '../models/result-modele';

@Injectable({
  providedIn: 'root'
})
export class CategorieBoissonService {

  categorieboisson : CategorieBoisson;
  categoriesboisson : CategorieBoisson[] = [];

  categoriesboissonSubject = new Subject<CategorieBoisson[]>();
  constructor(private http: HttpClient) {
    this.getAllCategoriesBoisson();
   }


   emitCategoriesBoisson(){
    this.categoriesboissonSubject.next(this.categoriesboisson);
   }

   getAllCategoriesBoisson(){
     const url = environment.api + 'categoriesboisson';
     return new Promise ((resolve, reject) =>{
      this.http.get(url).subscribe(
       (data: Result)=>{
          this.categoriesboisson = data.args;
          this.emitCategoriesBoisson();
          resolve(data);
       },
       (err)=>{
           reject(false);
       }
     )
   })
  }

  getCategorieBoissonById(id:number){
    const url = environment.api + 'categoriesboisson' + id;
    return new Promise( (resolve, reject)=>{
      this.http.get(url).subscribe(
        (data: Result)=>{
          this.categorieboisson = data.args;
          resolve(data);
        },
        (err)=>{
          reject(false);
        }
      )
    })
  }

  createCategorieBoisson(categorieboisson : CategorieBoisson){
    const url = environment.api + 'categoriesboisson';
    return new Promise( (resolve, reject)=>{
      this.http.post(url, categorieboisson).subscribe(
        (data: Result)=>{
          this.categorieboisson = data.args;
          this.emitCategoriesBoisson();
          resolve(data);
        },
        (err)=>{
          reject(false);
        }
      )
    })
  }

  deleteCategorieBoisson(id:number){
    const url = environment.api + 'categoriesboisson' + id;
    return new Promise( (resolve, reject)=>{
      this.http.delete(url).subscribe(
        (data: Result)=>{
          this.categorieboisson = data.args;
          resolve(data);
        },
        (err)=>{
          reject(false);
        }
      )
    })
  }

  updateCategorieBoisson(id:number, categorieBoisson :CategorieBoisson){
    const url = environment.api + 'categoriesboisson' + id;
    return new Promise( (resolve, reject)=>{
      this.http.put(url, categorieBoisson).subscribe(
        (data: Result)=>{
          this.categorieboisson = data.args;
          this.emitCategoriesBoisson();
          resolve(data);
        },
        (err)=>{
          reject(false);
        }
      )
    })
  }




}
