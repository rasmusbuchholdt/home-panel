import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Light } from '../models/light';

@Injectable({
  providedIn: 'root'
})
export class LightService {

  constructor(private http: HttpClient) { }

  public getLights(): Observable<Light[]> {
    return this.http.get<Light[]>(`${environment.apiUrl}/api/lights`);
  }

  public getLight(id: number): Observable<Light> {
    return this.http.get<Light>(`${environment.apiUrl}/api/light/${id}`);
  }

  public toggleLight(id: number): Observable<Light> {
    return this.http.get<Light>(`${environment.apiUrl}/api/light/${id}/toggle`);
  }
}
