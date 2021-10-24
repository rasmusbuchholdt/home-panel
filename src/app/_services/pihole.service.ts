import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { PiholeSummary } from '../_models/pihole-summary';

@Injectable({
  providedIn: 'root'
})
export class PiholeService {

  constructor(private http: HttpClient) { }

  public togglePihole(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/pihole/toggle`);
  }

  public getSummary(): Observable<PiholeSummary> {
    return this.http.get<PiholeSummary>(`${environment.apiUrl}/api/pihole`);
  }
}
