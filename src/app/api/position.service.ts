import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(
    private http: HttpClient,
  ) { }

  createPosition(id, body) {
    return this.http.post(apiURL+"position/", body);
  };

  updatePosition(id, body) {
    return this.http.put(apiURL+"position/"+id, body);
  };

}
