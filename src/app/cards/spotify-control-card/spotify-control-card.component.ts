import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-spotify-control-card',
  templateUrl: './spotify-control-card.component.html',
  styleUrls: ['./spotify-control-card.component.scss']
})
export class SpotifyControlCardComponent implements OnInit {

  public isPlaying = true;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
  }

  getPlaybackText() {
    return this.isPlaying ? `Currently playing: xxx` : "Not playing anything";
  }

  togglePlayPause(): void {
    this.isPlaying = !this.isPlaying;
    this.spotifyService.togglePlayPause().subscribe();
  }

  next(): void {
    this.spotifyService.next().subscribe();
  }

  previous(): void {
    this.spotifyService.previous().subscribe();
  }
}
