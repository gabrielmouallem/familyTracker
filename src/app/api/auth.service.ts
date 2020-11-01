import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  login(body) {
    return this.http.post(apiURL+"profile/login", body);
  };

  register(body) {
    return this.http.post(apiURL+"profile", body);
  }
}
