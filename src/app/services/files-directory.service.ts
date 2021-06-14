import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result-modele';

@Injectable({
  providedIn: 'root'
})
export class FilesDirectoryService {

  files: string[] = [];
  filesSubject = new Subject<string[]>();

  constructor(private http: HttpClient) { }

  emitFilesDirectory() {
    this.filesSubject.next(this.files);
  }

  getFiles(folder: string) {
    const url = `${environment.api}` + 'files';
    const body = {
      "folder": folder,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body).subscribe(
        (data: Result) => {
          this.files = data.args
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      )
    })
  }
}
