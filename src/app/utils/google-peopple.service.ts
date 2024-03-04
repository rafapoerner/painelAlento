import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  private apiKey = 'AIzaSyAxrJifE17CEO6YNR-ZegPF7MKwFEXTm7U'; 
  private baseApiUrl = 'https://people.googleapis.com/v1/people';

  constructor(private http: HttpClient) {}

  getProfilePicture(email: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.apiKey
    });

    const body = {
      'personFields': 'photos',
      'emailAddresses': [
        {'value': email}
      ]
    };

    return this.http.post(this.baseApiUrl, body, { headers });
  }
}
