import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private cookies: CookieService, private router: Router) {}

  title = 'Hacknet: Extension Studio';

  opened: boolean = false;

  isExtensionSelected() {
    return this.cookies.check('extId');
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/home');
    window.location.reload();
  }
}
