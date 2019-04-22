import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Note } from '../note';
import { NoteService } from '../note.service';

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
    private titleService: Title
  ) { }

  ngOnInit() {
    this.documentTitleAutoUpdate();
    this.routing();
  }

  documentTitleAutoUpdate() {
    this.noteForm.valueChanges.subscribe(
      values => {
        this.titleService.setTitle('uson > ' + values.title);
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
                this.currentNote = response.body as Note;
                this.updateInputValues();
              },
              error => {
                //TODO message
                this.router.navigate(['/']);
              }
            );
        }
        else {
          this.currentNote = {id: '', title: '', content: ''} as Note;
        }
      },

      error => {
        //TODO message
        this.router.navigate(['/']);
      }
    );

  }

  updateInputValues() { //TODO unsanitize strings (??)
    this.noteForm.setValue({
      title: this.currentNote.title,
      content: this.currentNote.content
    });
  }

  onSave() {
    if(this.currentNote.id === "") { //this is a new note, create it
      let note = { title: this.noteForm.value.title, content: this.noteForm.value.content } as Note;
      this.noteService.create(note).subscribe(
        response => {
          this.router.navigate(['/', response.body.id]);
        },
        error => {
          //TODO message
        }
      );
    }
    else { //this is an existing note, update it
      let note = { id: this.currentNote.id, title: this.noteForm.value.title, content: this.noteForm.value.content } as Note;
      this.noteService.update(note).subscribe(
        response => {
          this.currentNote = response.body as Note;
          this.updateInputValues();
        },
        error => {
          //TODO message
        }
      );
    }
  }

}
