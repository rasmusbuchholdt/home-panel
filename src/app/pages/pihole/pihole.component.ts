import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { take } from 'rxjs/operators';
import { PiholeStat } from 'src/app/_models/pihole-stat';
import { PiholeService } from 'src/app/_services/pihole.service';

@Component({
  selector: 'app-pihole',
  templateUrl: './pihole.component.html',
  styleUrls: ['./pihole.component.scss']
})
export class PiholeComponent implements OnInit, OnDestroy {

  stats: PiholeStat[] = [];
  isDesktop = false;
  loop: any;

  constructor(private piholeService: PiholeService, private deviceService: DeviceDetectorService) {
    this.setupStats();
    this.isDesktop = this.deviceService.isDesktop();
  }

  ngOnInit(): void { }

  setupStats() {
    this.piholeService.getSummary().pipe(take(1)).subscribe(summary => {
      this.stats = [];
      this.stats.push({
        title: `Total queries (${summary.unique_clients} clients)`,
        body: summary.dns_queries_today
      } as PiholeStat)
      this.stats.push({
        title: 'Queries blocked',
        body: summary.ads_blocked_today
      } as PiholeStat)
      this.stats.push({
        title: 'Percent blocked',
        body: `${summary.ads_percentage_today}%`
      } as PiholeStat)
      this.stats.push({
        title: 'Domains on blocklist',
        body: summary.domains_being_blocked
      } as PiholeStat);
      this.loop = setTimeout(() => this.setupStats(), 5000);
    });
  }

  ngOnDestroy() {
    clearInterval(this.loop);
  }
}
