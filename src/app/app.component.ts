import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private cookies: CookieService) {}

  title = 'Hacknet: Extension Studio';

  opened: boolean = false;

  isExtensionSelected() {
    return this.cookies.check('extId');
  }
}
