import { Component, OnInit } from '@angular/core';
import { SpotifyUser } from 'src/app/models/spotify-user';

import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.scss']
})
export class SpotifyComponent implements OnInit {

  user: SpotifyUser | undefined;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.spotifyService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  getAuthenticationUrl(): string {
    return this.spotifyService.getAuthenticationUrl();
  }

  getDeauthenticationUrl(): string {
    return this.spotifyService.getDeauthenticationUrl();
  }
}
