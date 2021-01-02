import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private cookies: CookieService) { }

  title = 'Hacknet: Extension Studio';

  opened: boolean = false;
  //isAuthenticated = false;

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth');
    return (token !== null && token !== '');
  }

  isExtensionSelected() {
    return this.cookies.check('extId');
  }

  logout() {
    this.cookies.delete('extId');
    localStorage.clear();

    window.location.reload();
  }
}
