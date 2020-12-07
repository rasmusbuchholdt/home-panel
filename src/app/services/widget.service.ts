import { Injectable } from '@angular/core';

import {
  PiholeControlCardComponent,
} from '../cards/pihole-control-card/pihole-control-card.component';
import {
  SpotifyControlCardComponent,
} from '../cards/spotify-control-card/spotify-control-card.component';
import { Widget } from '../models/widget';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  constructor() { }

  getWidgets(): Widget[] {
    // TODO: Add support for light control components
    return [
      {
        name: "Spotify",
        icon: "radio",
        type: SpotifyControlCardComponent
      },
      {
        name: "Pi-hole",
        icon: "router",
        type: PiholeControlCardComponent
      }
    ]
  }
}
