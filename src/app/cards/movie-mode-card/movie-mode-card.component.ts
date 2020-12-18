import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { take } from 'rxjs/operators';
import { MovieModeService } from 'src/app/services/movie-mode.service';

@Component({
  selector: 'app-movie-mode-card',
  templateUrl: './movie-mode-card.component.html',
  styleUrls: ['./movie-mode-card.component.scss']
})
export class MovieModeCardComponent implements OnInit {

  isOn = false;
  isDesktop = false;

  constructor(private movieModeService: MovieModeService, private deviceService: DeviceDetectorService) {
    this.getMovieModeStatus();
    this.isDesktop = this.deviceService.isDesktop();
  }

  ngOnInit(): void { }

  private getMovieModeStatus(): void {
    this.movieModeService.getMovieMode().pipe(take(1)).subscribe(status => {
      this.isOn = status;
    })
  }

  toggleMovieMode(): void {
    this.movieModeService.toggleMovieMode().pipe(take(1)).subscribe();
    this.isOn = !this.isOn;
  }
}
