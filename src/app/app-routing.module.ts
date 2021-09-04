import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HistoryComponent } from './pages/history/history.component';
import { MapComponent } from './pages/map/map.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'history', component: HistoryComponent },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
