import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Note } from '../note';
import { NoteService } from '../note.service';
import { MessageService } from '../message.service';
import { HtmlEntityDecodePipe } from '../html-entity-decode.pipe';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  currentNote: Note;

  noteForm = new FormGroup({
    title: new FormControl(),
    content: new FormControl()
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private titleService: Title,
    private messageService: MessageService,
    private htmlEntitiesDecodePipe: HtmlEntityDecodePipe
  ) { }

  ngOnInit() {
    this.documentTitleAutoUpdate();
    this.routing();
  }

  documentTitleAutoUpdate() {
    this.noteForm.valueChanges.subscribe(
      values => {
        if(values.title !== "") {
          this.titleService.setTitle('uson > ' + values.title);
        }
        else {
          this.titleService.setTitle('uson');
        }
      }
    );
  }

  routing() {
    this.route.paramMap.subscribe(
      params => {
        if(params.has('noteId')) {
          this.noteService.get(params.get('noteId'))
            .subscribe(
              response => {
                this.messageService.success('Fetched note.');
                this.currentNote = response.body as Note;
                this.updateInputValues();
              },
              error => {
                this.messageService.error(error);
                this.router.navigate(['/']);
              }
            );
        }
        else {
          this.currentNote = {id: '', title: '', content: ''} as Note;
        }
      },

      error => {
        this.messageService.error(error);
        if(error.status == 404) {
          this.router.navigate(['/']);
        }
      }
    );

  }

  updateInputValues() {
    this.noteForm.setValue({
      title: this.htmlEntitiesDecodePipe.transform(this.currentNote.title),
      content: this.htmlEntitiesDecodePipe.transform(this.currentNote.content)
    });
  }

  onSave() {
    if(this.currentNote.id === "") { //this is a new note, create it
      let note = { title: this.noteForm.value.title, content: this.noteForm.value.content } as Note;
      this.noteService.create(note).subscribe(
        response => {
          this.messageService.success('Created note.');
          this.router.navigate(['/', response.body.id]);
        },
        error => {
          this.messageService.error(error);
        }
      );
    }
    else { //this is an existing note, update it
      let note = { id: this.currentNote.id, title: this.noteForm.value.title, content: this.noteForm.value.content } as Note;
      this.noteService.update(note).subscribe(
        response => {
          this.messageService.success('Updated note.');
          this.currentNote = response.body as Note;
          this.updateInputValues();
        },
        error => {
          this.messageService.error(error);
        }
      );
    }
  }

}
