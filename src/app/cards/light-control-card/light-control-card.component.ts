import { Component, Input, OnInit } from '@angular/core';
import { delay, tap } from 'rxjs/operators';
import { Light } from 'src/app/models/light';
import { LightService } from 'src/app/services/light.service';

@Component({
  selector: 'app-light-control-card',
  templateUrl: './light-control-card.component.html',
  styleUrls: ['./light-control-card.component.scss']
})
export class LightControlCardComponent implements OnInit {

  @Input() light: Light | null = null;
  isOn = false;
  isSwitchOn = false;
  status = "Getting status";

  constructor(private lightService: LightService) { }

  ngOnInit(): void {
    if (this.light)
      this.getLightState(this.light);
  }

  getLightState(light: Light) {
    this.isOn = (light.state.on && light.state.reachable);
    this.isSwitchOn = light.state.reachable;
    this.status = `The switch is ${light.state.reachable ? 'on' : 'off'}`
  }

  refreshLightState() {
    if (this.light) {
      this.lightService.getLight(this.light.id).subscribe(light => {
        this.getLightState(light);
      });
    }
  }

  toggleLight() {
    if (this.light) {
      this.lightService.toggleLight(this.light.id).pipe(
        tap(() => this.isOn = !this.isOn),
        delay(500),
      ).subscribe(() => this.refreshLightState());
    }
  }
}
