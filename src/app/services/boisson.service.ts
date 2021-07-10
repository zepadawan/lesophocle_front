import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Boisson } from '../models/boisson.model';
import { Result } from '../models/result-modele';

@Injectable({
  providedIn: 'root'
})
export class BoissonService {
  boisson : Boisson;
  boissons : Boisson[] = [];

  boissonSubject = new Subject<Boisson[]>();
  constructor(private http: HttpClient) {
    this.getAllBoissons();
   }


   emitBoissons(){
    this.boissonSubject.next(this.boissons);
   }

   getAllBoissons(){
     const url = environment.api + 'boissons';
     return new Promise ((resolve, reject) =>{
      this.http.get(url).subscribe(
       (data: Result)=>{
          this.boissons = data.args;

          this.emitBoissons();
          resolve(data);
       },
       (err)=>{
           reject(false);
       }
     )
   })
  }

  getCategorieBoissonById(id:number){
    const url = environment.api + 'boissons' + id;
    return new Promise( (resolve, reject)=>{
      this.http.get(url).subscribe(
        (data: Result)=>{
          this.boisson = data.args;
          resolve(data);
        },
        (err)=>{
          reject(false);
        }
      )
    })
  }

  createCategorieBoisson(boisson : Boisson){
    const url = environment.api + 'boissons';
    return new Promise( (resolve, reject)=>{
      this.http.post(url, boisson).subscribe(
        (data: Result)=>{
          this.boisson = data.args;
          this.emitBoissons();
          resolve(data);
        },
        (err)=>{
          reject(false);
        }
      )
    })
  }

  deleteCategorieBoisson(id:number){
    const url = environment.api + 'boissons' + id;
    return new Promise( (resolve, reject)=>{
      this.http.delete(url).subscribe(
        (data: Result)=>{
          this.boisson = data.args;
          resolve(data);
        },
        (err)=>{
          reject(false);
        }
      )
    })
  }

  updateCategorieBoisson(id:number, boisson :Boisson ){
    const url = environment.api + 'boissons' + id;
    return new Promise( (resolve, reject)=>{
      this.http.put(url, boisson).subscribe(
        (data: Result)=>{
          this.boisson = data.args;
          this.emitBoissons();
          resolve(data);
        },
        (err)=>{
          reject(false);
        }
      )
    })
  }

}
