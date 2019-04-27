import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Note } from '../../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private http: HttpClient
  ) { }

  get(id: string): Observable<HttpResponse<Note>> {
    return this.http.get<Note>(environment.apiEndpoint + id, { observe: 'response' });
  }

  create(note: Note): Observable<HttpResponse<Note>> {
    return this.http.post<Note>(environment.apiEndpoint, { title: note.title, content: note.content }, { observe: 'response' });
  }

  update(note: Note): Observable<HttpResponse<Note>> {
    return this.http.put<Note>(environment.apiEndpoint + note.id, { title: note.title, content: note.content }, { observe: 'response' });
  }
}
