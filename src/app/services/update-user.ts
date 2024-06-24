import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/userProfile';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})

export class UpdateUserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  updateUser(userId: string, userProfile: UserProfile): Observable<any> {
    const cadastroUrl = `${this.apiUrl}api/identity/update-user/${userId}`;
    return this.http.put(cadastroUrl, userProfile);
  }
  

  uploadImage(formData: any): Observable<any> {
    const uploadUrl = `${this.apiUrl}api/identity/upload-image`;

    return this.http.post(uploadUrl, formData);
  }
}


