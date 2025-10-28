import { Routes } from '@angular/router';
import { HomePage } from './pages/home';
import { ResultsPage } from './pages/results';
import { BrowseChaptersPage } from './pages/browse-chapters';
import { SearchTariffPage } from './pages/search-tariff';
import { HowToImportPage } from './pages/how-to-import';
import { HelpPage } from './pages/help';
import { ContactPage } from './pages/contact';
import { ProhibitedItemsPage } from './pages/prohibited-items';
import { PersonalAllowancesPage } from './pages/personal-allowances';
import { VehicleTaxCalculatorPage } from './pages/vehicle-tax-calculator';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'results', component: ResultsPage },
  { path: 'browse-chapters', component: BrowseChaptersPage },
  { path: 'search-tariff', component: SearchTariffPage },
  { path: 'how-to-import', component: HowToImportPage },
  { path: 'help', component: HelpPage },
  { path: 'contact', component: ContactPage },
  { path: 'prohibited-items', component: ProhibitedItemsPage },
  { path: 'personal-allowances', component: PersonalAllowancesPage },
  { path: 'vehicle-tax-calculator', component: VehicleTaxCalculatorPage },
  { path: '**', redirectTo: '' }
];
