import { Routes } from '@angular/router';
import { HomePage } from './pages/home';
import { ResultsPage } from './pages/results';
import { BrowseChaptersPage } from './pages/browse-chapters';
import { SearchTariffPage } from './pages/search-tariff';
import { HowToImportPage } from './pages/how-to-import';
import { HelpPage } from './pages/help';
import { ContactPage } from './pages/contact';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'results', component: ResultsPage },
  { path: 'browse-chapters', component: BrowseChaptersPage },
  { path: 'search-tariff', component: SearchTariffPage },
  { path: 'how-to-import', component: HowToImportPage },
  { path: 'help', component: HelpPage },
  { path: 'contact', component: ContactPage },
  { path: '**', redirectTo: '' }
];
