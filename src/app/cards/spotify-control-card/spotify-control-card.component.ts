import { Component, OnInit } from '@angular/core';
import { delay, tap } from 'rxjs/operators';
import { SpotifyDevice } from 'src/app/models/spotify-device';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-spotify-control-card',
  templateUrl: './spotify-control-card.component.html',
  styleUrls: ['./spotify-control-card.component.scss']
})
export class SpotifyControlCardComponent implements OnInit {

  devices: SpotifyDevice[] = [];
  currentSong = "Fetching information";
  isPlaying = false;
  currentVolume = 0;
  isConnected = false;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getPlaybackLoop();
    this.getDevices();
  }

  getDevices(): void {
    this.spotifyService.getDevices().subscribe(devices => {
      this.devices = devices;
    });
  }

  getPlaybackLoop(): void {
    this.getPlayback();
    setTimeout(() => this.getPlaybackLoop(), 5000);
  }

  getDeviceIcon(type: string): string {
    // https://developer.spotify.com/documentation/web-api/reference/player/get-a-users-available-devices/#device-types
    if (['Computer', 'Tablet'].includes(type))
      return 'computer';
    else if (['Smartphone'].includes(type))
      return 'smartphone';
    else if (['TV'].includes(type))
      return 'tv';
    else
      return 'speaker';
  }

  transferPlayback(id: string): void {
    this.spotifyService.transferPlayback(id).pipe(
      delay(500),
    ).subscribe(() => this.getDevices());
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
