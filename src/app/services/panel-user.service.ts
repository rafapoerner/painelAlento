import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PanelUserService {
  private apiUrl = environment.apiUrl;
  private storageKey = 'usuarios';
  private usuariosSource: BehaviorSubject<any[]>;

  usuarios$: Observable<any[]>; // Alterado para Observable

  constructor(private http: HttpClient) {
    const storedData = this.getStoredUsuarios();
    this.usuariosSource = new BehaviorSubject<any[]>(storedData);
    this.usuarios$ = this.usuariosSource.asObservable(); // Inicializado depois
  }


  getUserByEmail(email: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = { headers: headers };

    return this.http.get<any[]>(`${this.apiUrl}api/identity/get-user-by-email?email=${email}`, options);
  }

  getUsuarios(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = { headers: headers };

    return this.http.get<any[]>(`${this.apiUrl}api/identity/list-users`, options);
  }

  saveUserToLocalStorage(user: any): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  setUsuarios(usuarios: any[]): void {
    this.usuariosSource.next(usuarios);
    this.storeUsuarios(usuarios);
  }

  storeUsuarios(usuarios: any[]): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(usuarios));
  }

  getStoredUsuarios(): any[] {
    const storedData = sessionStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : [];
  }

  fetchUsuariosFromServer(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = { headers: headers };

    return this.http.get<any[]>(`${this.apiUrl}api/identity/list-users`, options);
  }
}
