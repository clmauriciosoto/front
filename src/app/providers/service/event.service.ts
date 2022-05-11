import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private api = 'http://localhost:3000/event';

  constructor(private httpClient: HttpClient) {}

  getAllEvent() {
    return this.httpClient.get(this.api);
  }

  createEvent(event: Event) {
    return this.httpClient.post(this.api, event);
  }

  editEvent(event: Event) {
    const { id, ...data } = event;
    return this.httpClient.put(`${this.api}/${id}`, data);
  }

  deleteEvent(id: number) {
    return this.httpClient.delete(`${this.api}/${id}`);
  }
}
