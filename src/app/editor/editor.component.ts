import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  noteForm = new FormGroup({
    title: new FormControl(),
    content: new FormControl()
  });

  constructor() { }

  ngOnInit() {
  }

  onSave() {
    //TODO save note
  }

}
