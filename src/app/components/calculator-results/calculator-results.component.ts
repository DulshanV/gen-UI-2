import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculationResult, TaxItem } from '../../services/vehicle-calculator.service';

@Component({
  selector: 'app-calculator-results',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section aria-live="polite" class="space-y-4">
      <div *ngIf="!result" class="text-gray-600">Enter details to see estimated taxes.</div>
      <div *ngIf="result" class="space-y-4">
        <!-- Summary -->
        <div class="bg-white rounded-lg shadow-gov border-l-4 border-gov-accent p-6 print:border print:shadow-none">
          <h3 class="text-lg font-bold text-gov-dark mb-2">Summary</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div class="text-sm text-gray-600">Total Taxes</div>
              <div class="text-xl font-bold">{{ result?.subtotalTaxes | number:'1.2-2' }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-600">Total Payable (Taxes + Fees)</div>
              <div class="text-xl font-bold">{{ result?.totalPayable | number:'1.2-2' }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-600">Net Landed Cost</div>
              <div class="text-xl font-bold">{{ result?.netLandedCost | number:'1.2-2' }}</div>
            </div>
          </div>
          <p class="text-xs text-gray-600 mt-3">Estimated total payable shown above. This is an estimate — contact Customs for a binding ruling.</p>
          <button (click)="print()" class="mt-4 bg-gov-dark text-white px-3 py-2 rounded hidden print:hidden">Print Summary</button>
        </div>

        <!-- Breakdown -->
        <div class="bg-white rounded-lg shadow-gov p-6 print:shadow-none">
          <h4 class="font-bold text-gov-dark mb-3">Breakdown</h4>
          <div class="overflow-x-auto -mx-4 sm:mx-0">
            <table class="min-w-full text-sm">
              <thead>
                <tr class="text-left text-gray-600 border-b">
                  <th class="py-2 pr-4">Item</th>
                  <th class="py-2 pr-4">Base (LKR)</th>
                  <th class="py-2 pr-4">Rate</th>
                  <th class="py-2 pr-4">Amount (LKR)</th>
                  <th class="py-2">Formula</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-2 pr-4 font-medium">CIF</td>
                  <td class="py-2 pr-4">{{ result?.cif | number:'1.2-2' }}</td>
                  <td class="py-2 pr-4">—</td>
                  <td class="py-2 pr-4">—</td>
                  <td class="py-2">Declared or computed</td>
                </tr>
                <tr *ngFor="let t of result?.taxes">
                  <td class="py-2 pr-4 font-medium">{{ t.label }}</td>
                  <td class="py-2 pr-4">{{ t.base | number:'1.2-2' }}</td>
                  <td class="py-2 pr-4">{{ t.rate != null ? (t.rate * 100 | number:'1.0-2') + '%' : '—' }}</td>
                  <td class="py-2 pr-4">{{ t.amount | number:'1.2-2' }}</td>
                  <td class="py-2">{{ t.formula }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CalculatorResultsComponent {
  @Input() result: CalculationResult | null = null;
  print(): void { window.print(); }
}
