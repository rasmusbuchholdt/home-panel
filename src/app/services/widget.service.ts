import { Injectable } from '@angular/core';

import {
  LightControlCardComponent,
} from '../cards/light-control-card/light-control-card.component';
import {
  PiholeControlCardComponent,
} from '../cards/pihole-control-card/pihole-control-card.component';
import {
  SpacerCardComponent,
} from '../cards/spacer-card/spacer-card.component';
import {
  SpotifyControlCardComponent,
} from '../cards/spotify-control-card/spotify-control-card.component';
import { Light } from '../models/light';
import { Widget } from '../models/widget';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  constructor() { }

  // TODO: Needs to be completely rewritten
  getWidgets(lights: Light[]): Widget[] {
    let widgets: Widget[] = [
      {
        name: "Spotify",
        icon: "radio",
        type: SpotifyControlCardComponent
      },
      {
        name: "Pi-hole",
        icon: "router",
        type: PiholeControlCardComponent
      },
      {
        name: "Spacer",
        icon: "highlight_alt",
        type: SpacerCardComponent
      }
    ];
    lights.forEach(light => {
      widgets.push({
        name: light.name,
        icon: "light",
        type: LightControlCardComponent,
        inputs: { id: light.id }
      })
    });
    return widgets;
  }
}
