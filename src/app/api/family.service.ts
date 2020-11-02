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

  getFamilyPositions(profileID) {
    return this.http.get(apiURL+"family/positions/"+profileID);
  }

  addMemberToFamily(profileID, body) {
    return this.http.put(apiURL+"profile/"+profileID, body);
  }

  createFamily(body) {
    return this.http.post(apiURL+"family/", body);
  }

  getFamily(id) {
    return this.http.get(apiURL+"family/"+id);
  };

  updateFamily(id, body) {
    return this.http.put(apiURL+"family/"+id, body);
  }

}
