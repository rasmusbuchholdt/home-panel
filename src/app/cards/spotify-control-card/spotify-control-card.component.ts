import { Component, OnInit } from '@angular/core';
import { delay, tap } from 'rxjs/operators';
import { SpotifyPlayback } from 'src/app/models/spotify-playback';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-spotify-control-card',
  templateUrl: './spotify-control-card.component.html',
  styleUrls: ['./spotify-control-card.component.scss']
})
export class SpotifyControlCardComponent implements OnInit {

  currentSong = "Fetching information";
  isPlaying = false;
  playback: SpotifyPlayback | undefined;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getPlayback();
  }

  getPlayback(): void {
    this.spotifyService.getPlayback().subscribe(playback => {
      this.playback = playback;
      this.isPlaying = playback.is_playing;
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
