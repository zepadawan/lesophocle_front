import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfiguration {
  name: string;
  apiUrl: string;
  isProd: boolean;

  constructor(private http: HttpClient) { }

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
