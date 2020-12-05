import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { SpotifyPlayback } from '../models/spotify-playback';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  public getAuthenticationUrl(): string {
    return `${environment.apiUrl}/auth/spotify`;
  }

  public getPlayback(): Observable<SpotifyPlayback> {
    return this.http.get<SpotifyPlayback>(`${environment.apiUrl}/api/spotify/playback`);
  }
  public togglePlayPause(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/spotify/toggle`);
  }

  public next(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/spotify/next`);
  }

  public previous(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/spotify/previous`);
  }
}
