import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { delay, take } from 'rxjs/operators';
import { Light } from 'src/app/_models/light';
import { LightConfig } from 'src/app/_models/light-config';
import { LightService } from 'src/app/_services/light.service';
import { xyBriToRgb } from 'src/app/_utils/color-conversions';
import { normalize } from 'src/app/_utils/normalize';
import {
  LightConfigDialogComponent,
} from 'src/app/dialogs/light-config-dialog/light-config-dialog.component';

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
  svgColor = "#c0c0c0";
  xy = [0, 0];

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
    this.saturation = normalize(light.state.sat, 1, 254);
    this.brightness = normalize(light.state.bri, 1, 254);
    this.xy = light.state.xy;

    const rgb = xyBriToRgb(light.state.xy[0], light.state.xy[1], light.state.bri);
    this.svgColor = this.isOn ? `rgb(${rgb.R}, ${rgb.G}, ${rgb.B})` : "#c0c0c0";

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
      delay(500),
    ).subscribe(() => this.refreshLightState());
  }

  editLight() {
    if (!this.light) return;
    const rgb = xyBriToRgb(this.xy[0], this.xy[1], this.brightness);
    const dialogRef = this.dialog.open(LightConfigDialogComponent, {
      width: '250px',
      data: {
        id: this.light.id,
        enabled: this.isOn,
        rgb: { R: rgb.R, G: rgb.G, B: rgb.B, change: false },
        saturation: this.saturation,
        brightness: this.brightness,
      } as LightConfig
    });
    dialogRef.afterClosed().subscribe((result: LightConfig) => {
      if (result && this.light) {
        this.lightService.setLight(result).pipe(take(1)).subscribe();
        this.refreshLightState();
      }
    });
  }
}
