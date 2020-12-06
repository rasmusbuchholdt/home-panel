import { Component, OnInit } from '@angular/core';
import { delay, tap } from 'rxjs/operators';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-spotify-control-card',
  templateUrl: './spotify-control-card.component.html',
  styleUrls: ['./spotify-control-card.component.scss']
})
export class SpotifyControlCardComponent implements OnInit {

  currentSong = "Fetching information";
  isPlaying = false;
  currentVolume = 0;
  isConnected = false;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getPlaybackLoop();
  }

  getPlaybackLoop(): void {
    this.getPlayback();
    setTimeout(() => this.getPlaybackLoop(), 5000);
  }

  getPlayback(): void {
    this.spotifyService.getPlayback().subscribe(playback => {
      this.isPlaying = playback.is_playing;
      // TODO: Check if the Spotify API is actually up and running
      this.isConnected = true;
      this.currentVolume = playback.device.volume_percent;
      this.currentSong = this.isPlaying ? `${playback.item.artists[0].name} - ${playback.item.name}` : 'Not playing anything';
    });
  }

  setVolume(amount: any) {
    this.spotifyService.setVolume(+amount).subscribe();
  }

  togglePlayPause(): void {
    this.spotifyService.togglePlayPause().pipe(
      tap(() => this.isPlaying = !this.isPlaying),
      delay(500),
    ).subscribe(() => this.getPlayback());
  }

  next(): void {
    this.spotifyService.next().pipe(
      delay(500),
    ).subscribe(() => this.getPlayback());
  }

  previous(): void {
    this.spotifyService.previous().pipe(
      delay(500),
    ).subscribe(() => this.getPlayback());
  }

  formatVolumeLabel(value: number) {
    return `${value}%`;
  }
}
