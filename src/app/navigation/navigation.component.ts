import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @ViewChild('drawer') drawer: MatDrawer | undefined;
  @HostBinding("class") componentCssClass: string | undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  closeDrawer() {
    if (this.drawer && this.drawer.mode == 'over') {
      this.drawer.close();
    }
  }

  openDrawer() {
    if (this.drawer && this.drawer.mode == 'over') {
      this.drawer.open();
    }
  }

  onSwipeRight(event: any) {
    this.openDrawer();
  }

  onSwipeLeft(event: any) {
    this.closeDrawer();
  }
}
