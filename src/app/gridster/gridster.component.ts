import { Component, OnInit } from '@angular/core';
import {
  DisplayGrid,
  GridsterConfig,
  GridsterItem,
  GridType,
} from 'angular-gridster2';
import { take } from 'rxjs/operators';

import { Widget } from '../models/widget';
import { LightService } from '../services/light.service';
import { WidgetService } from '../services/widget.service';

@Component({
  selector: 'app-gridster',
  templateUrl: './gridster.component.html',
  styleUrls: ['./gridster.component.scss']
})
export class GridsterComponent implements OnInit {

  options: GridsterConfig = {
    draggable: {
      enabled: true
    },
    resizable: {
      enabled: true
    },
    outerMargin: false,
    displayGrid: DisplayGrid.OnDragAndResize,
    gridType: GridType.Fit,
    pushItems: true,
    margin: 5,
    minCols: 5,
    minRows: 3,
    defaultItemCols: 3,
    defaultItemRows: 3
  };
  dashboard: Array<GridsterItem> = [
  ];
  widgets: Widget[] = [];
  locked: boolean = false;

  constructor(private widgetService: WidgetService, private lightService: LightService) {
    this.getWidgets();
  }

  ngOnInit() { }

  toggleLock(): void {
    if (this.options.draggable && this.options.resizable) {
      this.options.draggable.enabled = this.locked;
      this.options.resizable.enabled = this.locked;
      this.locked = !this.locked;
      this.changedOptions();
    }
  }

  getWidgets() {
    this.lightService.getLights().pipe(take(1)).subscribe(lights => {
      this.widgets = this.widgetService.getWidgets(lights);
    });
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged)
      this.options.api.optionsChanged();
  }

  removeItem(item: any) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addWidget(widget: Widget) {
    const item: GridsterItem = {
      cols: 1, rows: 1, y: 0, x: 0, type: widget.type, inputs: widget.inputs
    };
    this.dashboard.push(item);
  }
}
