import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { delay, take, tap } from 'rxjs/operators';
import {
  LightConfigDialogComponent,
} from 'src/app/dialogs/light-config-dialog/light-config-dialog.component';
import { Light } from 'src/app/models/light';
import { LightConfig } from 'src/app/models/light-config';
import { LightService } from 'src/app/services/light.service';

const LIGHT_REFRESH_DELAY_IN_SECONS = 10;

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
  brightness = 0;
  saturation = 0;

  constructor(
    private lightService: LightService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (!this.light) return;
    this.getLightState(this.light);
  }

  getLightState(light: Light) {
    this.isOn = (light.state.on && light.state.reachable);
    this.isSwitchOn = light.state.reachable;
    this.status = `The switch is ${light.state.reachable ? 'on' : 'off'}`;
    this.saturation = this.normalize(light.state.sat, 1, 254);
    this.brightness = this.normalize(light.state.bri, 1, 254);

    setTimeout(() => {
      this.refreshLightState();
    }, LIGHT_REFRESH_DELAY_IN_SECONS);
  }

  refreshLightState() {
    if (!this.light) return;
    this.lightService.getLight(this.light.id).pipe(take(1)).subscribe(light => {
      this.getLightState(light);
    });
  }

  toggleLight() {
    if (!this.light) return;
    this.lightService.toggleLight(this.light.id).pipe(
      take(1),
      tap(() => this.isOn = !this.isOn),
      delay(500),
    ).subscribe(() => this.refreshLightState());
  }

  editLight() {
    if (!this.light) return;
    const dialogRef = this.dialog.open(LightConfigDialogComponent, {
      width: '250px',
      data: {
        id: this.light.id,
        enabled: this.isOn,
        rgb: { R: 0, G: 0, B: 0, change: false },
        saturation: this.saturation,
        brightness: this.brightness,
      } as LightConfig
    });
    dialogRef.afterClosed().subscribe((result: LightConfig) => {
      if (result && this.light) {
        this.lightService.setLight(result).pipe(take(1)).subscribe();
        this.brightness = result.brightness;
        this.saturation = result.saturation;
      }
    });
  }

  normalize(value: number, min: number, max: number): number {
    return (value - min) / (max - min) * 100;
  }
}
