import { Component, OnInit } from '@angular/core';
import { PiholeStat } from 'src/app/models/pihole-stat';
import { PiholeService } from 'src/app/services/pihole.service';

@Component({
  selector: 'app-pihole',
  templateUrl: './pihole.component.html',
  styleUrls: ['./pihole.component.scss']
})
export class PiholeComponent implements OnInit {

  stats: PiholeStat[] = [];

  constructor(private piholeService: PiholeService) {
    this.setupStats();
  }

  ngOnInit(): void { }

  setupStats() {
    this.piholeService.getSummary().subscribe(summary => {
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
      setTimeout(() => this.setupStats(), 5000);
    });
  }
}
