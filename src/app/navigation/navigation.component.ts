import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @HostBinding("class") componentCssClass: string | undefined;
  darkMode = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private cookieService: CookieService) {
    this.getDarkModePreference();
  }

  getDarkModePreference() {
    if (this.cookieService.check('dark_mode')) {
      this.darkMode = this.cookieService.get('dark_mode') === '1';
      this.componentCssClass = this.darkMode ? 'dark-theme' : '';
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.componentCssClass = this.darkMode ? 'dark-theme' : '';
    this.cookieService.set('dark_mode', this.darkMode ? '1' : '0');
  }
}
