import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';
import { HeaderComponent } from './components/header/header.component';
import { MessagesComponent } from './components/messages/messages.component';

import { HtmlEntityDecodePipe } from './pipes/html-entity-decode/html-entity-decode.pipe';
import { CopyLinkButtonComponent } from './components/copy-link-button/copy-link-button.component';
import { CopyClipboardDirective } from './directives/copy-clipboard.directive';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    HeaderComponent,
    MessagesComponent,
    HtmlEntityDecodePipe,
    CopyLinkButtonComponent,
    CopyClipboardDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
