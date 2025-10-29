import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header';
import { RegulatoryStatusComponent } from '../components/regulatory-status';
import { DutyTaxSimulatorComponent } from '../components/duty-tax-simulator';
import { ClassificationNotesComponent } from '../components/classification-notes';
import { searchMockData, regulatoryDetails, dutyTaxRates, classificationNotes, SearchSuggestion, RegulatoryDetail, DutyTaxCalculation } from '../data/search-mock';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    RegulatoryStatusComponent,
    DutyTaxSimulatorComponent,
    ClassificationNotesComponent
  ],
  template: `
    <app-header></app-header>

    <main class="min-h-screen bg-slate-50 py-12">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Breadcrumb -->
        <div class="mb-8">
          <a routerLink="/" class="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm font-medium">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back to Search
          </a>
        </div>

        <!-- Product Header -->
        <div *ngIf="selectedProduct" class="bg-white rounded-lg shadow-md p-8 mb-8 border-l-4 border-blue-600">
          <div class="mb-4">
            <span class="text-sm font-semibold text-slate-600 uppercase tracking-wide">HS Code Classification</span>
            <h1 class="text-3xl md:text-4xl font-bold text-slate-900 mt-2">{{ selectedProduct.commodityName }}</h1>
          </div>
          <p class="text-slate-700 text-lg mb-6">{{ selectedProduct.description }}</p>
          <div class="flex flex-wrap items-center gap-4">
            <div>
              <span class="text-sm text-slate-600">HS Code:</span>
              <div class="text-2xl font-mono font-bold text-slate-900 bg-slate-100 px-4 py-2 rounded-lg inline-block mt-2">
                {{ selectedProduct.hsCode }}
              </div>
            </div>
            <div>
              <span class="text-sm text-slate-600">Regulatory Status:</span>
              <div
                [ngClass]="{
                  'bg-red-100 text-red-800': selectedProduct.regulatoryStatus === 'prohibited',
                  'bg-yellow-100 text-yellow-800': selectedProduct.regulatoryStatus === 'restricted',
                  'bg-green-100 text-green-800': selectedProduct.regulatoryStatus === 'free'
                }"
                class="font-bold px-4 py-2 rounded-lg inline-block mt-2 text-sm"
              >
                {{ selectedProduct.regulatoryStatus === 'prohibited' ? 'PROHIBITED' : selectedProduct.regulatoryStatus === 'restricted' ? 'RESTRICTED' : 'FREE/UNRESTRICTED' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Tabs Navigation -->
        <div class="bg-white rounded-lg shadow-md mb-8 border-b border-slate-200">
          <div class="flex border-b border-slate-200">
            <button
              (click)="activeTab = 'regulatory'"
              [class.border-b-2]="activeTab === 'regulatory'"
              [class.border-blue-600]="activeTab === 'regulatory'"
              [class.text-blue-600]="activeTab === 'regulatory'"
              class="px-6 py-4 font-semibold text-slate-700 hover:text-slate-900 transition"
            >
              Regulatory Status
            </button>
            <button
              (click)="activeTab = 'duty'"
              [class.border-b-2]="activeTab === 'duty'"
              [class.border-blue-600]="activeTab === 'duty'"
              [class.text-blue-600]="activeTab === 'duty'"
              class="px-6 py-4 font-semibold text-slate-700 hover:text-slate-900 transition"
            >
              Duty & Tax
            </button>
            <button
              (click)="activeTab = 'classification'"
              [class.border-b-2]="activeTab === 'classification'"
              [class.border-blue-600]="activeTab === 'classification'"
              [class.text-blue-600]="activeTab === 'classification'"
              class="px-6 py-4 font-semibold text-slate-700 hover:text-slate-900 transition"
            >
              Classification Notes
            </button>
          </div>
        </div>

        <!-- Tab Contents -->
        <div class="space-y-8">
          <!-- Regulatory Status Tab -->
          <div *ngIf="activeTab === 'regulatory'" [@fadeInOut]="'in'">
            <app-regulatory-status
              [status]="selectedProduct!.regulatoryStatus"
              [permits]="regulatoryPermits"
            ></app-regulatory-status>

            <!-- Additional Info for Restricted Items -->
            <div *ngIf="selectedProduct!.regulatoryStatus === 'restricted'" class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 class="font-bold text-blue-900 mb-3">Before You Import</h4>
              <ul class="space-y-2 text-blue-800 text-sm">
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Contact each government agency listed above to obtain required permits</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Obtain all mandatory permits before presenting goods to customs</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Prepare all supporting documentation for customs declaration</span>
                </li>
              </ul>
            </div>

            <!-- Prohibited Warning -->
            <div *ngIf="selectedProduct!.regulatoryStatus === 'prohibited'" class="mt-8 bg-red-50 border-l-4 border-red-600 rounded-lg p-6">
              <div class="flex items-start gap-4">
                <svg class="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                <div>
                  <h4 class="font-bold text-red-900">Prohibited Items Cannot Be Imported</h4>
                  <p class="text-red-800 text-sm mt-2">
                    This item is completely prohibited from import under Sri Lanka Customs regulations. Any attempt to import this product is illegal and subject to severe penalties under customs law.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Duty & Tax Tab -->
          <div *ngIf="activeTab === 'duty'" [@fadeInOut]="'in'">
            <app-duty-tax-simulator
              *ngIf="selectedProduct"
              [hsCode]="selectedProduct.hsCode"
              [rates]="dutyTaxRates"
            ></app-duty-tax-simulator>
          </div>

          <!-- Classification Notes Tab -->
          <div *ngIf="activeTab === 'classification'" [@fadeInOut]="'in'">
            <app-classification-notes
              *ngIf="selectedProduct"
              [hsCode]="selectedProduct.hsCode"
              [notes]="classificationNotesText"
            ></app-classification-notes>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg p-8 text-white">
          <div class="max-w-2xl">
            <h3 class="text-2xl font-bold mb-3">Questions About Your Import/Export?</h3>
            <p class="text-slate-300 mb-6">
              This portal provides guidance based on current customs regulations. For binding classifications, formal rulings, or specific advice regarding your shipment, contact the Customs ICT Directorate.
            </p>
            <button routerLink="/contact" class="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Contact Customs ICT Directorate
            </button>
          </div>
        </div>

        <!-- Additional Resources -->
        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
            <h4 class="font-bold text-slate-900 mb-3">Helpful Resources</h4>
            <ul class="space-y-2 text-sm text-slate-700">
              <li><a routerLink="/how-to-import" class="text-blue-600 hover:text-blue-800">HS Code Classification Guide</a></li>
              <li><a routerLink="/search-tariff" class="text-blue-600 hover:text-blue-800">Customs Tariff Information</a></li>
              <li><a routerLink="/how-to-import" class="text-blue-600 hover:text-blue-800">Import/Export Procedures</a></li>
            </ul>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-600">
            <h4 class="font-bold text-slate-900 mb-3">Government Agencies</h4>
            <p class="text-sm text-slate-700 mb-3">
              Links to government agencies that issue permits and approvals are provided in the Regulatory Status section above.
            </p>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16">
      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="text-center text-sm">
          <p>© 2024 Sri Lanka Customs. Trade Regulatory Guidance Portal.</p>
          <p class="text-xs text-slate-500 mt-2">For the latest information, visit the official Sri Lanka Customs website</p>
        </div>
      </div>
    </footer>
  `
})
export class ResultsPage implements OnInit {
  activeTab: 'regulatory' | 'duty' | 'classification' = 'regulatory';
  selectedProduct: SearchSuggestion | null = null;
  regulatoryPermits: RegulatoryDetail[] = [];
  dutyTaxRates: DutyTaxCalculation = {
    customsDutyRate: 0,
    vatRate: 0.18,
    cess: 0,
    palRate: 0
  };
  classificationNotesText = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const hsCode = params['hsCode'];
      const commodityName = params['commodityName'];

      if (hsCode) {
        this.selectedProduct =
          searchMockData.find(item => item.hsCode === hsCode) || null;

        if (this.selectedProduct) {
          this.regulatoryPermits = regulatoryDetails[hsCode] || [];
          this.dutyTaxRates = dutyTaxRates[hsCode] || {
            customsDutyRate: 0.15,
            vatRate: 0.18,
            cess: 0,
            palRate: 0.05
          };
          this.classificationNotesText = classificationNotes[hsCode] || '';
        }
      }
    });
  }
}
