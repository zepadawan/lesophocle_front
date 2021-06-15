import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Allergene } from '../models/allergene';
import { Result } from '../models/result-modele';

@Injectable({
  providedIn: 'root'
})
export class AllergeneService {

  allergenes: Allergene[] = [];
  allergeneSubject = new Subject<Allergene[]>();
  constructor(private http: HttpClient) {
    this.getAllergenes();
  }

  emitSubjectAllergenes() {
    this.allergeneSubject.next(this.allergenes);
  }

  getAllergenes() {
    return new Promise((resolve, reject) => {
      const url = environment.api + 'allergenes'
      this.http.get(url).subscribe(
        (data: Result) => {
          if (data.status == 200) {
            this.allergenes = data.args;
            resolve(data)
          } else {
            console.log(data.message);
            reject(false);
          };
          this.emitSubjectAllergenes();
        }
      );
    })
  }

}
