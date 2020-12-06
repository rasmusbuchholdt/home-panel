import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LightsComponent } from './pages/lights/lights.component';
import { PiholeComponent } from './pages/pihole/pihole.component';
import { SpotifyComponent } from './pages/spotify/spotify.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'spotify', component: SpotifyComponent, pathMatch: 'full' },
  { path: 'lights', component: LightsComponent, pathMatch: 'full' },
  { path: 'pihole', component: PiholeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
