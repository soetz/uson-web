import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MessageLevel } from './message-level';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = [];
  countdowns = [];

  constructor() { }

  private getMessage(object: HttpErrorResponse | string): string {
    let message = "";

    if(object instanceof HttpErrorResponse) {
      message = object.error;
    }
    else {
      message = object;
    }

    return message;
  }

  private pushMessage(level: MessageLevel, object: HttpErrorResponse | string) {
    let text = this.getMessage(object);
    let message = {
      level: level,
      message: text,
      active: true
    };
    this.messages.push(message);
    setTimeout(() => {
      message.active = false;
    }, 3000);
    this.startCountdown(message);
  }

  startCountdown(message: Message) {
    let countdown = { message: message };
    this.countdowns.push(countdown);
    setTimeout(() => {
      if(this.countdowns.includes(countdown)) {
        this.removeMessage(message);
      }
    }, 15000);
  }

  stopCountdown(message: Message) {
    this.countdowns = this.countdowns.filter(countdown => {
      return !(countdown.message === message);
    });
  }

  removeMessage(message: Message) {
    this.messages = this.messages.filter(messageFromArray => {
      return !(message === messageFromArray);
    });
  }

  success(object: HttpErrorResponse | string) {
    this.pushMessage(MessageLevel.Success, object);
  }

  warning(object: HttpErrorResponse | string) {
    this.pushMessage(MessageLevel.Warning, object);
  }

  error(object: HttpErrorResponse | string) {
    this.pushMessage(MessageLevel.Error, object);
  }
}
