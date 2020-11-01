import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(
    private http: HttpClient,
  ) { }

  getFamily(id) {
    return this.http.get(apiURL+"family/"+id);
  };

}
