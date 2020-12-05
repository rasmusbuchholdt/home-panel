import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.scss']
})
export class SpotifyComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
  }

  getAuthenticationUrl(): string {
    return this.spotifyService.getAuthenticationUrl();
  }

  togglePlayPause(): void {
    this.spotifyService.togglePlayPause().subscribe();
  }

  next(): void {
    this.spotifyService.next().subscribe();
  }

  previous(): void {
    this.spotifyService.previous().subscribe();
  }
}
