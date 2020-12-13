import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColorEvent } from 'ngx-color';
import { LightConfig } from 'src/app/models/light-config';

@Component({
  selector: 'app-light-config-dialog',
  templateUrl: './light-config-dialog.component.html',
  styleUrls: ['./light-config-dialog.component.scss']
})
export class LightConfigDialogComponent implements OnInit {

  selectedColor = "blue";

  constructor
    (
      public dialogRef: MatDialogRef<LightConfigDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: LightConfig
    ) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  formatSliderLabel(value: number) {
    return `${value}%`;
  }

  handleChange($event: ColorEvent) {
    this.data.rgb.R = $event.color.rgb.r;
    this.data.rgb.G = $event.color.rgb.g;
    this.data.rgb.B = $event.color.rgb.b;
    this.selectedColor = $event.color.hex;
    this.data.rgb.change = true;
  }
}
