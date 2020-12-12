import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Light } from '../models/light';
import { LightConfig } from '../models/light-config';

@Injectable({
  providedIn: 'root'
})
export class LightService {

  constructor(private http: HttpClient) { }

  getLights(): Observable<Light[]> {
    return this.http.get<Light[]>(`${environment.apiUrl}/api/lights`);
  }

  getLight(id: number): Observable<Light> {
    return this.http.get<Light>(`${environment.apiUrl}/api/light/${id}`);
  }

  toggleLight(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/light/${id}/toggle`);
  }

  setLight(lightConfig: LightConfig): Observable<object> {
    return this.http.post(`${environment.apiUrl}/api/light/set`, lightConfig);
  }
}
