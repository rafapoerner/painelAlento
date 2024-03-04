import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  private apiUrl = `${environment.apiUrl}/api/identity/`  
  
  constructor(private http: HttpClient) {}

  userDelete(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Skip-Cert-Validation': 'true'
    });

    return this.http.delete<any>(`${this.apiUrl}/delete-user/${id}`, { headers });
  }
}
