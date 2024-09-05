import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Group } from '../../../interfaces/group.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  http = inject(HttpClient)

  groups = signal<Group[]>([])

  getGroups() {
    return this.groups()
  }

  set(groups : Group[]){
    this.groups.set(groups)
  }

  get() {
    return this.http.get<Group[]>(`${environment.apiUrl}/groups`)
  }

  create(newGroup : Group) {
    return this.http.post<Group>(`${environment.apiUrl}/groups`, {
      ...newGroup
    }).subscribe(group => {
      const currentGroups = this.getGroups()
      this.groups.set([
        group,
        ...currentGroups
      ])
    })
  }
}
