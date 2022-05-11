import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Event } from 'src/app/providers/interfaces/event.interface';
import { EventService } from 'src/app/providers/service/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  eventList: Event[] = [];
  @Output() editEvent = new EventEmitter<Event>();
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.getEventList();
  }

  getEventList() {
    this.eventList = [];
    this.eventService
      .getAllEvent()
      .toPromise()
      .then((resp: any) => {
        const { success, data } = resp;
        if (success) {
          this.eventList = data;
        }
      });
  }

  deleteEvent(id: number) {
    this.eventService
      .deleteEvent(id)
      .toPromise()
      .then((resp: any) => {
        const { success, message } = resp;
        if (success) {
          this.getEventList();
        }
      });
  }

  sendEvent(item: Event) {
    this.editEvent.emit(item);
  }
}
