import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
  ) { }

  getProfile(id) {
    return this.http.get(apiURL+"profile/"+id);
  };

  updateProfile(id, body) {
    return this.http.put(apiURL+"profile/"+id, body);
  };

}
