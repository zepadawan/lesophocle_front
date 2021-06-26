import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result-modele';
import { Client } from '../models/client.model'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clients: Client[] = [];
  client: Client;
  isAuth: boolean = false;
  isAdmin: boolean = false;
  isSuperAdmin: boolean = false;

  clientSubject = new Subject<Client[]>();
  clientId: number;
  token = "";
  role: string;
  url = `${environment.api}` + 'clients/';


  constructor(private http: HttpClient) {
    this.getAllClients();
  }

  emitClients(): void {
    this.clientSubject.next(this.clients);
  }

  getAllClients() {
    return new Promise((resolve, reject) => {
      this.http.get(this.url).subscribe(
        (datas: Result) => {
          this.clients = datas.args;
          resolve(datas)
        },
        (err) => {
          reject(err);
        }
      )
    })
  };

  getClientById(id: number) {
    const url = this.url + id
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (data: Result) => {
          this.client = data.args
          resolve(data)
        },
        (err) => {
          reject(err);
        }
      )
    })
  }

  createClient(newClient: Client) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url, newClient).subscribe(
        (data) => {
          resolve(data);
          this.emitClients();
        },
        (err) => {
          reject(err);
        }
      )
    })
  }

  updateClient(id: number, client: Client) {
    const url = this.url + id;
    return new Promise((resolve, reject) => {
      this.http.put(url, client).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      )
    })
  }

  deleteClient(id: number) {
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


  logOut(): void {
    this.client = null;
    this.isAuth = false;
    this.isAdmin = false;
    this.isSuperAdmin = false;
    this.clientSubject = new Subject<Client[]>();
  }
}
