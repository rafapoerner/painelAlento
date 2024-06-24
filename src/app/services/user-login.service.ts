// user-login.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(userLogin: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Skip-Cert-Validation': 'true',
    });

    const options = { headers: headers };
    const loginUrl = `${this.apiUrl}api/identity/login`;

    return this.http.post(loginUrl, userLogin, options).pipe(
      tap((response: any) => { // tap - side effect para ações que não interferem no fluxo principal. ex: sessionStorage.
        const userEmail = response.email;
        sessionStorage.setItem('user', JSON.stringify({ email: userEmail }));
      })
    );
  }

  logout() {
    // Remover os detalhes do usuário da sessionStorage
    sessionStorage.removeItem('user');
  }

}
