import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TextData } from '../../_models/text-data';

@Component({
  selector: 'app-text-card-dialog',
  templateUrl: './text-card-dialog.component.html'
})
export class TextCardDialogComponent implements OnInit {

  ngOnInit() { }

  constructor
    (
      public dialogRef: MatDialogRef<TextCardDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: TextData
    ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
