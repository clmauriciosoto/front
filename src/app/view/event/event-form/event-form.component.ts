import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Event } from 'src/app/providers/interfaces/event.interface';
import { EventService } from 'src/app/providers/service/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {
  id: any;
  form = this.fb.group({
    title: ['', [Validators.required]],
    date: [this.getDateToday(), [Validators.required]],
  });

  @Output() newEventCreated = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private eventService: EventService) {}

  get title() {
    return this.form.get('title');
  }
  get date() {
    return this.form.get('date');
  }
  ngOnInit(): void {}

  cancel() {
    this.form.reset();
    this.date?.setValue(this.getDateToday());
    this.id = null;
  }

  getDateToday() {
    let date = new Date();
    return date.toISOString().split('T')[0];
  }

  save() {
    this.eventService
      .createEvent(this.form.value)
      .toPromise()
      .then(({ success, data }: any) => {
        if (success) {
          this.newEventCreated.emit(true);
          this.cancel();
        }
      });
  }

  edit() {
    this.eventService
      .editEvent({ ...this.form.value, id: this.id })
      .toPromise()
      .then(({ success }: any) => {
        if (success) {
          this.cancel();
          this.newEventCreated.emit(true);
        }
      });
  }

  setEvent(event: Event) {
    this.id = event.id;
    this.title?.setValue(event.title);
    this.date?.setValue(event.date);
  }
}
