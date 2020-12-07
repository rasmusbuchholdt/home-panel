import { Component, ComponentRef, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { LightService } from '../services/light.service';

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

  componentCreated(compRef: ComponentRef<any>) {
    if (compRef.componentType.name === 'LightControlCardComponent') {
      this.lightService.getLight(this.inputs.id).pipe(take(1)).subscribe(light => {
        compRef.instance.light = light;
        compRef.instance.getLightState(light);
      });
    }
  }
}
