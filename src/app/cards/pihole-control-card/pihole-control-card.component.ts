import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { PiholeSummary } from 'src/app/models/pihole-summary';
import { PiholeService } from 'src/app/services/pihole.service';

@Component({
  selector: 'app-pihole-control-card',
  templateUrl: './pihole-control-card.component.html',
  styleUrls: ['./pihole-control-card.component.scss']
})
export class PiholeControlCardComponent implements OnInit {

  piholeSummary: PiholeSummary | undefined;
  isOn = false;

  constructor(private piholeService: PiholeService) { }

  ngOnInit(): void {
    this.getSummary();
  }

  getSummary(): void {
    this.piholeService.getSummary().subscribe(summary => {
      this.piholeSummary = summary;
      this.isOn = summary.status === 'enabled';
    });
  }

  togglePihole(): void {
    this.piholeService.togglePihole().pipe(
      tap(() => this.isOn = !this.isOn),
    ).subscribe();
  }
}
