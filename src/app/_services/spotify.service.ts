import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { SpotifyDevice } from '../_models/spotify-device';
import { SpotifyPlayback } from '../_models/spotify-playback';
import { SpotifyUser } from '../_models/spotify-user';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  public getAuthenticationUrl(): string {
    return `${environment.apiUrl}/auth/spotify`;
  }

  public getDeauthenticationUrl(): string {
    return `${environment.apiUrl}/auth/spotify/logout`;
  }

  public getPlayback(): Observable<SpotifyPlayback> {
    return this.http.get<SpotifyPlayback>(`${environment.apiUrl}/api/spotify/playback`);
  }

  public getDevices(): Observable<SpotifyDevice[]> {
    return this.http.get<SpotifyDevice[]>(`${environment.apiUrl}/api/spotify/devices`);
  }

  public getUser(): Observable<SpotifyUser> {
    return this.http.get<SpotifyUser>(`${environment.apiUrl}/api/spotify/user`);
  }

  public setVolume(amount: number) {
    return this.http.get(`${environment.apiUrl}/api/spotify/volume/set/${amount}`);
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

  public transferPlayback(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/spotify/playback/${id}/set`);
  }
}
