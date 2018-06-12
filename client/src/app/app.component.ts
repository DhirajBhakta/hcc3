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
    iconRegistry.addSvgIcon('access_time', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/access_time.svg'))
                .addSvgIcon('date_range', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/date_range.svg'))
                .addSvgIcon('birthday_cake', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/birthday_cake.svg'))
                .addSvgIcon('drop', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/drop.svg'))
                .addSvgIcon('home', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/home.svg'))
                .addSvgIcon('phone', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/phone.svg'))
                .addSvgIcon('school', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/school.svg'))
                .addSvgIcon('domain', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/domain.svg'))
                .addSvgIcon('gender', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/gender.svg'))
                .addSvgIcon('forward', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/forward.svg'))
                .addSvgIcon('medical', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/medical.svg'))
                .addSvgIcon('add_circle', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/add_circle_outline.svg'));

  }
}
