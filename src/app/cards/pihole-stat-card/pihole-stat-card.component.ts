import { Component, Input, OnInit } from '@angular/core';
import { PiholeStat } from 'src/app/models/pihole-stat';

@Component({
  selector: 'app-pihole-stat-card',
  templateUrl: './pihole-stat-card.component.html',
  styleUrls: ['./pihole-stat-card.component.scss']
})
export class PiholeStatCardComponent implements OnInit {

  @Input() stat: PiholeStat | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
