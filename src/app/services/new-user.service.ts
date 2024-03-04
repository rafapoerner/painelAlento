import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewUser } from '../models/newUser';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})

export class NewUserService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  cadastrarUsuario(newUser: NewUser): Observable<any> {

    const cadastroUrl = `${this.apiUrl}api/identity/new-account`;

    return this.http.post(cadastroUrl, newUser);
  }

  uploadImage(formData: any): Observable<any> {
    const uploadUrl = `${this.apiUrl}api/identity/upload-image`;

    return this.http.post(uploadUrl, formData);
  }
}


