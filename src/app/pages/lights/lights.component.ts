import { Component, OnInit } from '@angular/core';
import { Light } from 'src/app/models/light';
import { LightService } from 'src/app/services/light.service';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.scss']
})
export class LightsComponent implements OnInit {

  lights: Light[] = [];

  constructor(private lightService: LightService) { }

  ngOnInit(): void {
    this.lightService.getLights().subscribe(lights => {
      this.lights = lights;
    });
  }
}
