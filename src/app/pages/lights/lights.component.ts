import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Light } from 'src/app/_models/light';
import { LightService } from 'src/app/_services/light.service';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.scss']
})
export class LightsComponent implements OnInit {

  lights: Light[] = [];

  constructor(private lightService: LightService) { }

  ngOnInit(): void {
    this.getLights();
  }

  private getLights(): void {
    this.lightService.getLights().pipe(take(1)).subscribe(lights => {
      this.lights = lights;
    });
  }

  async toggleAll(targetState: boolean): Promise<void> {
    // We need to get the fresh data every time in case somebody turned it off on the switch
    const lights = await this.lightService.getLights().toPromise();
    lights.map(light => this.toggleLight(light, targetState));
    // this.lights = lights;
  }

  private toggleLight(light: Light, targetState: boolean): void {
    if (light.state.on === targetState && !light.state.reachable) return;
    this.lightService.toggleLight(light.id).pipe(take(1)).subscribe(() => {
      light.state.on = targetState;
    });
  }
}
