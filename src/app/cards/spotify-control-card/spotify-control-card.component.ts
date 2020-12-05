import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-spotify-control-card',
  templateUrl: './spotify-control-card.component.html',
  styleUrls: ['./spotify-control-card.component.scss']
})
export class SpotifyControlCardComponent implements OnInit {

  public isPlaying = false;
  public playback = "Fetching information";

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getPlayback();
  }

  getPlayback(): void {
    this.spotifyService.getPlayback().subscribe(playback => {
      this.isPlaying = playback.is_playing;
      this.playback =  playback.is_playing ? `${playback.item.artists[0].name} - ${playback.item.name}` : 'Not playing anything';
    });
  }

  togglePlayPause(): void {
    this.spotifyService.togglePlayPause().toPromise().then(() => {
      this.getPlayback();
    });
  }

  next(): void {
    this.spotifyService.next().toPromise().then(() => {
      this.getPlayback();
    });
  }

  previous(): void {
    this.spotifyService.previous().toPromise().then(() => {
      this.getPlayback();
    });
  }
}
