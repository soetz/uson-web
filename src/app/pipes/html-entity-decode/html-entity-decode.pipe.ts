import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'htmlEntityDecode'
})
@Injectable({
  providedIn: "root"
})
export class HtmlEntityDecodePipe implements PipeTransform {

  transform(encoded: string): string {

    var element = document.createElement('div');

    //regular expression matching HTML entities
    var entity = /&(?:#x[a-f0-9]+|#[0-9]+|[a-z0-9]+);?/ig;

    let decoded = encoded.replace(entity, function(m) {
        element.innerHTML = m;
        return element.textContent;
    });

    return decoded;
  }

}