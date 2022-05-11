import { Component, OnInit, ViewChild } from '@angular/core';
import { Event } from 'src/app/providers/interfaces/event.interface';
import { EventFormComponent } from './event-form/event-form.component';
import { EventListComponent } from './event-list/event-list.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  @ViewChild('eventList') eventList!: EventListComponent;
  @ViewChild('eventForm') eventForm!: EventFormComponent;

  constructor() {}

  ngOnInit(): void {}

  updateList($event: boolean) {
    this.eventList.getEventList();
  }
  getEvent($event: Event) {
    this.eventForm.setEvent($event);
  }
}
