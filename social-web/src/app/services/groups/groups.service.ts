import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Group } from '../../../interfaces/group.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  http = inject(HttpClient)

  get() {
    return this.http.get<Group[]>(`${environment.apiUrl}/groups`)
  }

  create(newGroup : Group) {
    return this.http.post<Group>(`${environment.apiUrl}/groups`, {
      ...newGroup
    })
  }
}
