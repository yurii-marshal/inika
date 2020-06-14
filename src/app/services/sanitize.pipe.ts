import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({name: 'safeHtmlPipe'})
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) {
    }

    transform(value, type) {
        switch (type) {
            case 'url':
                return this.sanitized.bypassSecurityTrustUrl(value);
            case 'source':
                return this.sanitized.bypassSecurityTrustResourceUrl(value);
            default:
                value = value.replace(/\n/g, '<br>');
                return this.sanitized.bypassSecurityTrustHtml(value);
        }
    }
}
