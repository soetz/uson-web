import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-go-to-note-field',
  templateUrl: './go-to-note-field.component.html',
  styleUrls: ['./go-to-note-field.component.scss']
})
export class GoToNoteFieldComponent implements OnInit {

  goToNote = new FormGroup({
    note: new FormControl()
  });

  constructor(
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  readValue(): string | boolean {
    let value = this.goToNote.value.note;
    if(value.startsWith('http://')) {
      value = value.substr(7);
    }
    else if(value.startsWith('https://')) {
      value = value.substr(8);
    }

    if(value.startsWith(location.host + '/')) {
      value = value.substr(location.host.length + 1);
    }

    if(/^[a-zA-Z]{8}$/.test(value)) {
      return value;
    }

    this.messageService.error('Could not read this note id, sorry.');

    return false;
  }

  onSubmit() {
    let value = this.readValue();
    if(value) {
      this.router.navigate(['/', value]);
      this.goToNote.reset();
    }
  }
}
