import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-copy-link-button',
  templateUrl: './copy-link-button.component.html',
  styleUrls: ['./copy-link-button.component.scss']
})
export class CopyLinkButtonComponent implements OnInit {

  currentLocation: string = "";
  isRoot: boolean;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if(this.router.isActive('', true)) {
      this.isRoot = true;
    }
    else {
      this.currentLocation = location.host + location.pathname;
    }
  }

}
