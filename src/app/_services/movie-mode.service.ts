import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieModeService {

  constructor(private http: HttpClient) { }

  public toggleMovieMode(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/moviemode/toggle`);
  }

  getMovieMode(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiUrl}/api/moviemode/`);
  }
}
