import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget',
  template: `
    <ndc-dynamic [ndcDynamicComponent]="component"></ndc-dynamic>
  `,
})
export class WidgetComponent implements OnInit {

  @Input() component: any;

  constructor() { }

  ngOnInit(): void { }

}
