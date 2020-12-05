import { LayoutModule } from '@angular/cdk/layout';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  LightControlCardComponent,
} from './cards/light-control-card/light-control-card.component';
import {
  SpotifyControlCardComponent,
} from './cards/spotify-control-card/spotify-control-card.component';
import {
  VoiceControlCardComponent,
} from './cards/voice-control-card/voice-control-card.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LightsComponent } from './pages/lights/lights.component';
import { SpotifyComponent } from './pages/spotify/spotify.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavigationComponent,
    SpotifyComponent,
    LightsComponent,
    SpotifyControlCardComponent,
    VoiceControlCardComponent,
    LightControlCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSliderModule
  ],
  providers: [
    HttpClient,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
