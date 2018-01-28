import { Component } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('access_time',sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/access_time.svg'))
                .addSvgIcon('date_range',sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/date_range.svg'));
  }
}
