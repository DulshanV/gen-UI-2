import { Routes } from '@angular/router';
import { HomePage } from './pages/home';
import { ResultsPage } from './pages/results';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'results', component: ResultsPage },
  { path: '**', redirectTo: '' }
];
