import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  DisplayGrid,
  GridsterConfig,
  GridsterItem,
  GridType,
} from 'angular-gridster2';
import { take } from 'rxjs/operators';

import { TextData } from '../_models/text-data';
import { Widget } from '../_models/widget';
import { DashboardService } from '../_services/dashboard.service';
import { LightService } from '../_services/light.service';
import { WidgetService } from '../_services/widget.service';
import {
  TextCardDialogComponent,
} from '../dialogs/text-card-dialog/text-card-dialog.component';

@Component({
  selector: 'app-gridster',
  templateUrl: './gridster.component.html',
  styleUrls: ['./gridster.component.scss']
})
export class GridsterComponent implements OnInit {

  options: GridsterConfig = {
    draggable: {
      enabled: false
    },
    resizable: {
      enabled: false
    },
    outerMargin: false,
    displayGrid: DisplayGrid.None,
    gridType: GridType.VerticalFixed,
    pushItems: true,
    margin: 5,
    minCols: 12,
    maxCols: 12,
    minRows: 6,
    maxRows: 6,
    defaultItemCols: 1,
    defaultItemRows: 1,
    fixedRowHeight: 125
  };
  dashboard: Array<GridsterItem> = [
  ];
  widgets: Widget[] = [];
  locked: boolean = true;

  constructor(
    private widgetService: WidgetService,
    private lightService: LightService,
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.getWidgets();
    this.loadDashboard();
  }

  ngOnInit() { }

  toggleLock(): void {
    if (this.options.draggable && this.options.resizable) {
      this.options.draggable.enabled = this.locked;
      this.options.resizable.enabled = this.locked;
      this.options.displayGrid = this.locked ? DisplayGrid.Always : DisplayGrid.None,
        this.locked = !this.locked;
      this.changedOptions();
    }
  }

  loadDashboard(): void {
    this.dashboard = this.dashboardService.getDashboard();
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

  removeItem(item: GridsterItem) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addWidget(widget: Widget) {
    const item: GridsterItem = {
      cols: widget.cols, rows: widget.rows, y: 0, x: 0, type: widget.type, typeName: widget.typeName, inputs: widget.inputs || {}
    };

    if (widget.typeName === 'Text') {
      this.openTextCardDialog(item);
    } else {
      this.dashboard.push(item);
    }
  }

  openTextCardDialog(item: GridsterItem) {
    const dialogRef = this.dialog.open(TextCardDialogComponent, {
      width: '250px',
      data: { title: '', body: '' } as TextData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        item.inputs.title = result.title;
        item.inputs.body = result.body;
        this.dashboard.push(item);
      }
    });
  }

  saveDashboard(): void {
    this.dashboardService.saveDashboard(this.dashboard);
    this.snackBar.open('Your dashboard has been saved to your local storage', undefined, {
      duration: 2000
    });
  }
}
