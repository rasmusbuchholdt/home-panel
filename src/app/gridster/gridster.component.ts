import { Component, OnInit } from '@angular/core';
import {
  DisplayGrid,
  GridsterConfig,
  GridsterItem,
  GridType,
} from 'angular-gridster2';

import { Widget } from '../models/widget';
import { WidgetService } from '../services/widget.service';

@Component({
  selector: 'app-gridster',
  templateUrl: './gridster.component.html',
  styleUrls: ['./gridster.component.scss']
})
export class GridsterComponent implements OnInit {

  options: GridsterConfig = {
    draggable: {
      enabled: true,
    },
    resizable: {
      enabled: true,
    },
    outerMargin: false,
    displayGrid: DisplayGrid.None,
    gridType: GridType.Fit,
    swap: false,
    pushItems: true,
    maxCols: 4
  };
  dashboard: Array<GridsterItem> = [];
  widgets: Widget[] = [];
  locked: boolean = false;

  constructor(private widgetService: WidgetService) {
    this.getWidgets();
  }

  ngOnInit() { }

  toggleLock(): void {
    if (this.options.draggable && this.options.resizable) {
      this.locked = !this.locked;
      this.options.draggable.enabled = this.locked;
      this.options.resizable.enabled = this.locked;
      this.changedOptions();
    }
  }

  getWidgets() {
    this.widgets = this.widgetService.getWidgets();
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged)
      this.options.api.optionsChanged();
  }

  removeItem(item: any) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addWidget(widget: Widget) {
    const item: GridsterItem = { cols: 2, rows: 2, y: 0, x: 2, type: widget.type };
    this.dashboard.push(item);
  }
}
