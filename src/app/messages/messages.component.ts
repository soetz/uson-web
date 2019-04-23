import { Component, OnInit, Input } from '@angular/core';

import { MessageLevel } from '../message-level';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  @Input() MessageLevel = MessageLevel;

  constructor(
    public messageService: MessageService
  ) { }

  ngOnInit() {
  }
}
