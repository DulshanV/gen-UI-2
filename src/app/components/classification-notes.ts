import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classification-notes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg border border-slate-200">
      <!-- Header -->
      <button
        (click)="toggleExpanded()"
        class="w-full px-6 py-4 flex justify-between items-center hover:bg-slate-50 transition border-b border-slate-200"
      >
        <div class="text-left">
          <h3 class="text-lg font-bold text-slate-900">Classification Notes</h3>
          <p class="text-sm text-slate-500 mt-1">
            Legal references, Chapter Notes, and GRI Rules
          </p>
        </div>
        <svg
          [class.rotate-180]="isExpanded()"
          class="w-6 h-6 text-slate-600 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      <!-- Expanded Content -->
      <div *ngIf="isExpanded()" class="px-6 py-6 prose prose-sm max-w-none">
        <div class="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded">
          <p class="text-sm text-blue-900 font-semibold mb-2">Classification Reference</p>
          <p class="text-sm text-blue-800">
            HS Code: <span class="font-mono font-bold">{{ hsCode }}</span>
          </p>
        </div>

        <!-- Legal Text -->
        <div class="space-y-4 text-slate-700 leading-relaxed">
          <div *ngFor="let paragraph of notesParagraphs()" class="text-sm">
            {{ paragraph }}
          </div>
        </div>

        <!-- Key Points -->
        <div class="mt-6 bg-slate-50 rounded-lg p-4 border border-slate-200">
          <h4 class="font-bold text-slate-900 mb-3">Key Classification Points:</h4>
          <ul class="space-y-2">
            <li *ngFor="let point of keyPoints()" class="text-sm text-slate-700 flex items-start gap-2">
              <span class="text-blue-600 font-bold flex-shrink-0">•</span>
              <span>{{ point }}</span>
            </li>
          </ul>
        </div>

        <!-- Disclaimer -->
        <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p class="text-xs text-yellow-800">
            <strong>Legal Disclaimer:</strong> This information is provided for reference only. For official classification guidance, contact the Sri Lanka Customs Tariff Classification Unit. All interpretations must align with the Harmonized Commodity Description and Coding System (HS Code).
          </p>
        </div>
      </div>
    </div>
  `
})
export class ClassificationNotesComponent {
  @Input() hsCode: string = '';
  @Input() notes: string = '';

  isExpanded = signal(false);

  toggleExpanded(): void {
    this.isExpanded.set(!this.isExpanded());
  }

  notesParagraphs() {
    if (!this.notes) return [];
    return this.notes.split('\n\n').filter(p => p.trim());
  }

  keyPoints() {
    const pointMap: Record<string, string[]> = {
      '8703.23.90': [
        'Vehicle must be classified based on engine type and displacement',
        'Used vehicles must be valued at market value or CIF price, whichever is higher',
        'Spark-ignition engines exceeding 1500cc fall into the higher duty bracket',
        'All environmental and safety certifications must be obtained prior to import',
        'Classification follows CITES regulations if applicable'
      ],
      '8803.90.00': [
        'Aircraft classification depends on maximum take-off weight (MTOW)',
        'Unmanned aerial vehicles (UAVs/Drones) are classified as aircraft',
        'Spare parts and accessories follow the same classification as the parent aircraft',
        'Commercial use requires CAASL approval and licensing',
        'Military aircraft require Ministry of Defense clearance'
      ],
      '3004.90.00': [
        'All pharmaceutical products require NMRA registration prior to import',
        'Generic drugs must provide bioequivalence certificates',
        'Minimum shelf life of 75% of original expiry is required',
        'Batch testing and quality inspections are mandatory',
        'Classification based on therapeutic use and composition'
      ],
      '0302.13.00': [
        'Fresh fish requires continuous cold chain compliance',
        'Health certificates from exporting country are mandatory',
        'SLSI inspection must be completed before customs release',
        'Classification depends on species, size, and preservation method',
        'Specific import quotas and seasonal restrictions may apply'
      ]
    };

    return pointMap[this.hsCode] || [
      'Verify the exact HS Code matches your product',
      'Ensure all documentation meets current regulatory requirements',
      'Contact relevant government agencies for permits and approvals',
      'Check for any seasonal restrictions or quotas',
      'Consult customs specialists for borderline cases'
    ];
  }
}
