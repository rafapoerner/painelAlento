import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PanelUserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

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

  getAllUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
    });

    const options = { headers: headers };

    return this.http.get<any>(`${this.apiUrl}api/identity/list-users`, options);
  }
  
  saveUserToLocalStorage(user: any): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
}
