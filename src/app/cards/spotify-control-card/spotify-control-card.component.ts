import { Component, OnInit } from '@angular/core';
import { SpotifyPlayback } from 'src/app/models/spotify-playback';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-spotify-control-card',
  templateUrl: './spotify-control-card.component.html',
  styleUrls: ['./spotify-control-card.component.scss']
})
export class SpotifyControlCardComponent implements OnInit {

  currentSong = "Fetching information";
  playback: SpotifyPlayback | undefined;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getPlayback();
  }

  getPlayback(): void {
    this.spotifyService.getPlayback().subscribe(playback => {
      this.playback = playback;
      this.currentSong = playback.is_playing ? `${playback.item.artists[0].name} - ${playback.item.name}` : 'Not playing anything';
    });
  }

  setVolume(amount: any) {
    this.spotifyService.setVolume(+amount).subscribe();
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

  formatVolumeLabel(value: number) {
    return `${value}%`;
  }
}
