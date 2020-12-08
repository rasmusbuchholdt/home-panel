import { Injectable } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { CookieService } from 'ngx-cookie-service';

import { WidgetService } from './widget.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private cookieService: CookieService, private widgetService: WidgetService) { }

  saveDashboard(dashboard: GridsterItem[],): void {
    this.cookieService.set('dashboard', JSON.stringify(dashboard));
  }

  getDashboard(): GridsterItem[] {
    if (this.cookieService.check('dashboard')) {
      let items: GridsterItem[] = JSON.parse(this.cookieService.get('dashboard'));
      items.forEach(item => {
        item.type  = this.widgetService.getWidgetComponentType(item.typeName);
      });
      return items;
    }
    return [];
  }
}
