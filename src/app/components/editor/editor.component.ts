import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Note } from '../../models/note';
import { NoteService } from '../../services/note/note.service';
import { MessageService } from '../../services/message/message.service';
import { HtmlEntityDecodePipe } from '../../pipes/html-entity-decode/html-entity-decode.pipe';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  currentNote: Note = {id: "", title: "", content: ""};
  isModified: boolean;

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
    this.isModified = false;
    this.documentTitleAutoUpdate();
    this.modifiedAutoUpdate();
    this.routing();
  }

  documentTitleAutoUpdate() {
    this.setDocumentTitle(this.currentNote.title);
    this.noteForm.valueChanges.subscribe(
      values => {
        this.setDocumentTitle(values.title);
      }
    );
  }

  setDocumentTitle(title: string | null) {
    if(title !== "" && title !== null) {
      this.titleService.setTitle('uson > ' + title);
    }
    else {
      this.titleService.setTitle('uson');
    }
  }

  modifiedAutoUpdate() {
    this.noteForm.valueChanges.subscribe(
      values => {
        let title = (values.title === null) ? "" : values.title;
        let content = (values.content === null) ? "" : values.content;
        this.isModified = (title !== this.currentNote.title || content !== this.currentNote.content);
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
                this.setInputValues();
              },
              error => {
                this.messageService.error(error);
                this.router.navigate(['/']);
              }
            );
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

  setInputValues() {
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
          this.setInputValues();
        },
        error => {
          this.messageService.error(error);
        }
      );
    }
  }
}
