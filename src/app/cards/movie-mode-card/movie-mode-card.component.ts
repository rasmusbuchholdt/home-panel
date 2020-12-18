import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { MovieModeService } from 'src/app/services/movie-mode.service';

@Component({
  selector: 'app-movie-mode-card',
  templateUrl: './movie-mode-card.component.html',
  styleUrls: ['./movie-mode-card.component.scss']
})
export class MovieModeCardComponent implements OnInit {

  isOn = false;

  constructor(private movieModeService: MovieModeService) { }

  ngOnInit(): void {
    this.getMovieModeStatus();
  }

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
