import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @ViewChild('drawer') drawer: MatDrawer | undefined;
  @HostBinding("class") componentCssClass: string | undefined;
  darkMode = false;
  pihole = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private cookieService: CookieService) {
    this.getDarkModePreference();
    this.pihole = environment.pihole;
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

  closeDrawer() {
    if (this.drawer && this.drawer.mode == 'over') {
      this.drawer.close();
    }
  }
}
