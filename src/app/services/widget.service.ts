import { Component, Injectable } from '@angular/core';

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
import { TextCardComponent } from '../cards/text-card/text-card.component';
import { Light } from '../models/light';
import { Widget } from '../models/widget';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  private componentRegistry = {
    'Spotify': SpotifyControlCardComponent,
    'Pihole': PiholeControlCardComponent,
    'Light': LightControlCardComponent,
    'Text': TextCardComponent,
    'Spacer': SpacerCardComponent
  }

  constructor() { }

  getWidgetComponentType(typeName: string): Component {
    // @ts-ignore
    return this.componentRegistry[typeName];
  }

  // TODO: Needs to be completely rewritten
  getWidgets(lights: Light[]): Widget[] {
    let widgets: Widget[] = [
      {
        name: "Spotify",
        icon: "radio",
        type: SpotifyControlCardComponent,
        typeName: 'Spotify',
        cols: 2,
        rows: 1
      },
      {
        name: "Pi-hole",
        icon: "router",
        type: PiholeControlCardComponent,
        typeName: 'Pihole',
        cols: 1,
        rows: 1
      },
      {
        name: "Text",
        icon: "article",
        type: TextCardComponent,
        typeName: 'Text',
        inputs: { title: 'test', body: 'body', type: 'text' },
        cols: 1,
        rows: 1
      },
      {
        name: "Spacer",
        icon: "highlight_alt",
        type: SpacerCardComponent,
        typeName: 'Spacer',
        cols: 1,
        rows: 1
      }
    ];
    lights.forEach(light => {
      widgets.push({
        name: light.name,
        icon: "light",
        type: LightControlCardComponent,
        typeName: 'Light',
        inputs: { id: light.id, type: 'light' },
        cols: 1,
        rows: 1
      })
    });
    return widgets;
  }
}
