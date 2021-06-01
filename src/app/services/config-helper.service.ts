import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppConfiguration {

  constructor(private http: HttpClient) { }

  // // Charger les informations du fichier de configuration
  // public load(environmentObject: object, path: string): Promise<any> {
  //   return this.http.get<any>(path).pipe(map(data => {

  //     if (data !== null && data !== undefined) {
  //       Object.keys(data).forEach(propertyData => {
  //         if (Object.keys(environmentObject).findIndex(x => x === propertyData) !== -1) {
  //           console.log(data);
  //           data[propertyData] = environmentObject[propertyData];
  //         }
  //       });
  //     }
  //     return data;
  //   })).toPromise();
  // }

  ensureInit(): Promise<any> {
    return new Promise((r, e) => {

      this.http.get("./assets/config/config.json")
        .subscribe(
          (content: AppConfiguration) => {
            Object.assign(this, content);
            r(this);
          },
          reason => e(reason));
    });
  }
}
