import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params) => {
        if(params.has('noteId')) {
          //TODO show corresponding note
        }
        else {
          //silence is golden for the moment
        }
      }
    );
  }

  onSave() {
    //TODO save note
  }

}
