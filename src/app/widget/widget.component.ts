import { Component, ComponentRef, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { LightService } from '../_services/light.service';

@Component({
  selector: 'app-widget',
  template: `
    <ndc-dynamic
      [ndcDynamicComponent]="component"
      (ndcDynamicCreated)="componentCreated($event)"
    ></ndc-dynamic>
  `,
})
export class WidgetComponent implements OnInit {

  @Input() component: any;
  @Input() inputs: any;

  constructor(private lightService: LightService) { }

  ngOnInit(): void { }

  // TODO: Better handling for different component types
  componentCreated(compRef: ComponentRef<any>): void {
    if (!this.inputs) return;
    if (this.inputs.type === 'light') {
      this.lightService.getLight(this.inputs.id).pipe(take(1)).subscribe(light => {
        compRef.instance.light = light;
        compRef.instance.getLightState(light);
      });
    } else if (this.inputs.type === 'text') {
      compRef.instance.title = this.inputs.title;
      compRef.instance.body = this.inputs.body;
    }
  }
}
