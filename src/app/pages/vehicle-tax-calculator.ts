import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { HeaderComponent } from "../components/header";

interface VehicleType {
  id: string;
  name: string;
  dutyRate: number;
  exciseRate: number;
}

interface CalculationResult {
  vehicleValue: number;
  importDuty: number;
  dutyableValue: number;
  vat: number;
  exciseDuty: number;
  registrationFee: number;
  totalCost: number;
}

@Component({
  selector: "app-vehicle-tax-calculator",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent],
  template: `
    <app-header></app-header>

    <main class="min-h-screen bg-gov-bg">
      <!-- Breadcrumb -->
      <div class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <a
            routerLink="/"
            class="text-gov-dark hover:text-gov-primary font-medium text-sm"
          >
            ← Back to Home
          </a>
        </div>
      </div>

      <!-- Page Title -->
      <div class="bg-white border-b border-gray-200 py-8">
        <div class="max-w-7xl mx-auto px-6">
          <h1 class="text-3xl font-serif font-bold text-gov-dark mb-2">
            Vehicle Import Tax Calculator
          </h1>
          <p class="text-gray-600">
            Calculate estimated import duties and taxes for vehicles to Sri
            Lanka
          </p>
        </div>
      </div>

      <!-- Info Banner -->
      <div
        class="bg-blue-50 border-l-4 border-blue-500 p-6 mx-6 my-8 rounded-lg max-w-7xl mx-auto"
      >
        <h3 class="font-bold text-blue-900 mb-2">ℹ️ Calculator Information</h3>
        <p class="text-sm text-blue-800">
          This calculator provides estimates based on 2025 Sri Lanka Customs
          rates. Actual duties may vary based on final vehicle assessment,
          customs valuation, and any changes in tax regulations. For binding
          calculations, contact the Customs ICT Directorate.
        </p>
      </div>

      <!-- Calculator Container -->
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Input Form -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-gov p-8 sticky top-6">
              <h2 class="text-xl font-bold text-gov-dark mb-6">
                Vehicle Details
              </h2>

              <!-- Vehicle Type -->
              <div class="mb-6">
                <label class="block text-sm font-bold text-gov-dark mb-2"
                  >Vehicle Type</label
                >
                <select
                  [(ngModel)]="selectedVehicleType"
                  (change)="updateCalculation()"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-primary"
                >
                  <option value="">Select vehicle type</option>
                  <option
                    *ngFor="let vehicle of vehicleTypes"
                    [value]="vehicle.id"
                  >
                    {{ vehicle.name }}
                  </option>
                </select>
                <p class="text-xs text-gray-600 mt-1">
                  <span *ngIf="selectedVehicleType">
                    Import Duty: {{ getSelectedVehicle()?.dutyRate }}% | Excise:
                    {{ getSelectedVehicle()?.exciseRate }}%
                  </span>
                </p>
              </div>

              <!-- Engine Capacity (for calculation basis) -->
              <div class="mb-6">
                <label class="block text-sm font-bold text-gov-dark mb-2"
                  >Engine Capacity (CC)</label
                >
                <input
                  type="number"
                  [(ngModel)]="engineCapacity"
                  (change)="updateCalculation()"
                  placeholder="e.g., 1500"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-primary"
                />
                <p class="text-xs text-gray-600 mt-1">
                  Optional - for reference only
                </p>
              </div>

              <!-- Vehicle Value (CIF) -->
              <div class="mb-6">
                <label class="block text-sm font-bold text-gov-dark mb-2"
                  >Vehicle Value (USD CIF)</label
                >
                <div class="flex items-center">
                  <span class="text-gray-600 mr-2">$</span>
                  <input
                    type="number"
                    [(ngModel)]="vehicleValueUsd"
                    (change)="updateCalculation()"
                    placeholder="Enter in USD"
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-primary"
                  />
                </div>
                <p class="text-xs text-gray-600 mt-1">
                  Cost, Insurance & Freight value
                </p>
              </div>

              <!-- Exchange Rate -->
              <div class="mb-6">
                <label class="block text-sm font-bold text-gov-dark mb-2"
                  >Exchange Rate (USD to LKR)</label
                >
                <div class="flex items-center">
                  <span class="text-gray-600 mr-2">LKR</span>
                  <input
                    type="number"
                    [(ngModel)]="exchangeRate"
                    (change)="updateCalculation()"
                    placeholder="e.g., 330"
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-primary"
                  />
                  <span class="text-gray-600 ml-2">/USD</span>
                </div>
                <p class="text-xs text-gray-600 mt-1">
                  Current official rate (update as needed)
                </p>
              </div>

              <!-- Calculate Button -->
              <button
                (click)="updateCalculation()"
                class="w-full bg-gov-primary text-white py-3 rounded-lg font-bold hover:bg-gov-dark transition"
              >
                Calculate Duties & Taxes
              </button>

              <!-- Reset Button -->
              <button
                (click)="resetCalculator()"
                class="w-full mt-3 bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                Reset
              </button>
            </div>
          </div>

          <!-- Results -->
          <div class="lg:col-span-2">
            <div *ngIf="!hasError(); else errorState">
              <!-- Summary Card -->
              <div
                class="bg-gov-dark text-white rounded-lg shadow-gov p-8 mb-8"
              >
                <p class="text-gray-300 text-sm mb-2">TOTAL IMPORT COST</p>
                <div class="flex items-baseline gap-2">
                  <span class="text-5xl font-bold">LKR</span>
                  <span class="text-5xl font-bold">{{
                    formatNumber(result().totalCost)
                  }}</span>
                </div>
                <p class="text-gray-300 mt-4 text-sm">
                  Including vehicle value, all duties, taxes, and fees
                </p>
              </div>

              <!-- Breakdown -->
              <div class="space-y-4">
                <!-- Vehicle Value -->
                <div class="bg-white rounded-lg shadow-gov p-6">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-gov-dark font-bold"
                      >Vehicle Value (CIF)</span
                    >
                    <span class="text-gray-600 text-sm"
                      >(USD {{ formatNumber(vehicleValueUsd()) }})</span
                    >
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">in LKR</span>
                    <span class="text-xl font-bold text-gov-dark">{{
                      formatNumber(vehicleValueLkr())
                    }}</span>
                  </div>
                </div>

                <!-- Import Duty -->
                <div
                  class="bg-blue-50 rounded-lg shadow-gov p-6 border-l-4 border-blue-500"
                >
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-gov-dark font-bold">Import Duty</span>
                    <span class="text-gray-600 text-sm"
                      >({{ getSelectedVehicle()?.dutyRate }}%)</span
                    >
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">of CIF value</span>
                    <span class="text-xl font-bold text-blue-700"
                      >+ LKR {{ formatNumber(result().importDuty) }}</span
                    >
                  </div>
                </div>

                <!-- Dutiable Value -->
                <div
                  class="bg-gray-50 rounded-lg shadow-gov p-6 border-l-4 border-gray-400"
                >
                  <div class="flex justify-between items-center">
                    <span class="text-gov-dark font-bold"
                      >Dutiable Value (CIF + Import Duty)</span
                    >
                    <span class="text-lg font-bold text-gray-700"
                      >LKR {{ formatNumber(result().dutyableValue) }}</span
                    >
                  </div>
                </div>

                <!-- VAT -->
                <div
                  class="bg-green-50 rounded-lg shadow-gov p-6 border-l-4 border-green-500"
                >
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-gov-dark font-bold"
                      >Value Added Tax (VAT)</span
                    >
                    <span class="text-gray-600 text-sm">(8%)</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">of dutiable value</span>
                    <span class="text-xl font-bold text-green-700"
                      >+ LKR {{ formatNumber(result().vat) }}</span
                    >
                  </div>
                </div>

                <!-- Excise Duty -->
                <div
                  class="bg-amber-50 rounded-lg shadow-gov p-6 border-l-4 border-amber-500"
                >
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-gov-dark font-bold">Excise Duty</span>
                    <span class="text-gray-600 text-sm"
                      >({{ getSelectedVehicle()?.exciseRate }}%)</span
                    >
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">of CIF value</span>
                    <span class="text-xl font-bold text-amber-700"
                      >+ LKR {{ formatNumber(result().exciseDuty) }}</span
                    >
                  </div>
                </div>

                <!-- Registration & Documentation Fee -->
                <div
                  class="bg-purple-50 rounded-lg shadow-gov p-6 border-l-4 border-purple-500"
                >
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-gov-dark font-bold"
                      >Registration & Doc Fees</span
                    >
                    <span class="text-gray-600 text-sm">Fixed</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600"
                      >Registration and inspection fees</span
                    >
                    <span class="text-xl font-bold text-purple-700"
                      >+ LKR {{ formatNumber(result().registrationFee) }}</span
                    >
                  </div>
                </div>
              </div>

              <!-- Important Notes -->
              <div
                class="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8"
              >
                <h3 class="font-bold text-amber-900 mb-3">
                  Important Disclaimers
                </h3>
                <ul class="space-y-2 text-sm text-amber-800">
                  <li>
                    • This is an <strong>estimate only</strong> and not a
                    binding calculation
                  </li>
                  <li>
                    • Actual duties depend on final customs assessment and
                    vehicle valuation
                  </li>
                  <li>
                    • Rates subject to change - always verify current rates with
                    Sri Lanka Customs
                  </li>
                  <li>
                    • Additional charges may apply (e.g., port handling,
                    clearance agent fees)
                  </li>
                  <li>
                    • Contact Customs ICT Directorate for official binding
                    rulings
                  </li>
                </ul>
              </div>
            </div>

            <ng-template #errorState>
              <div
                class="bg-red-50 border-2 border-red-300 rounded-lg p-8 text-center"
              >
                <svg
                  class="w-16 h-16 text-red-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4v2m0 4v2M12 3a9 9 0 110 18 9 9 0 010-18z"
                  />
                </svg>
                <h3 class="text-lg font-bold text-red-900 mb-2">
                  Please Complete the Form
                </h3>
                <p class="text-red-800">
                  Select a vehicle type and enter a value to see the calculation
                  results.
                </p>
              </div>
            </ng-template>
          </div>
        </div>
      </div>

      <!-- Rate Reference -->
      <div class="bg-white py-12 border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="text-2xl font-serif font-bold text-gov-dark mb-8">
            Tax Rates & Fees (2025)
          </h2>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b-2 border-gov-dark bg-gov-light text-white">
                  <th class="px-4 py-3 text-left font-bold">Vehicle Type</th>
                  <th class="px-4 py-3 text-center font-bold">Import Duty</th>
                  <th class="px-4 py-3 text-center font-bold">Excise Duty</th>
                  <th class="px-4 py-3 text-center font-bold">VAT</th>
                  <th class="px-4 py-3 text-center font-bold">
                    Registration Fee
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  *ngFor="let vehicle of vehicleTypes"
                  class="border-b border-gray-200 hover:bg-gov-bg transition"
                >
                  <td class="px-4 py-3 font-semibold text-gov-dark">
                    {{ vehicle.name }}
                  </td>
                  <td class="px-4 py-3 text-center text-gray-700">
                    {{ vehicle.dutyRate }}%
                  </td>
                  <td class="px-4 py-3 text-center text-gray-700">
                    {{ vehicle.exciseRate }}%
                  </td>
                  <td class="px-4 py-3 text-center text-gray-700">8.0%</td>
                  <td class="px-4 py-3 text-center text-gray-700">
                    LKR 15,000 - 25,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <p class="text-sm text-blue-900">
              <strong>Note:</strong> Import duty rates are based on the HS Code
              classification of the vehicle. The above rates are standard for
              typical passenger vehicles. Commercial vehicles, electric
              vehicles, and hybrid vehicles may have different rates. Consult
              with Sri Lanka Customs for your specific vehicle classification.
            </p>
          </div>
        </div>
      </div>

      <!-- Help Section -->
      <div class="bg-white py-12 border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="text-2xl font-serif font-bold text-gov-dark mb-8">
            Need More Information?
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              routerLink="/help"
              class="bg-gov-light text-white p-6 rounded-lg hover:shadow-lg transition"
            >
              <h4 class="font-bold mb-2">FAQ & Help</h4>
              <p class="text-sm opacity-90">
                Common questions about vehicle imports
              </p>
              <p class="mt-3 text-sm font-medium">Read more →</p>
            </a>
            <a
              routerLink="/how-to-import"
              class="bg-gov-primary text-white p-6 rounded-lg hover:shadow-lg transition"
            >
              <h4 class="font-bold mb-2">How to Import</h4>
              <p class="text-sm opacity-90">
                Step-by-step import process guide
              </p>
              <p class="mt-3 text-sm font-medium">View guide →</p>
            </a>
            <a
              routerLink="/contact"
              class="bg-gov-dark text-white p-6 rounded-lg hover:shadow-lg transition"
            >
              <h4 class="font-bold mb-2">Contact Customs</h4>
              <p class="text-sm opacity-90">
                Get expert assistance from officials
              </p>
              <p class="mt-3 text-sm font-medium">Contact →</p>
            </a>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gov-dark text-white border-t-4 border-gov-accent py-8">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <p class="text-sm text-gray-300">© 2025 Sri Lanka Customs</p>
      </div>
    </footer>
  `,
})
export class VehicleTaxCalculatorPage {
  selectedVehicleType = signal<string>("");
  vehicleValueUsd = signal<number>(0);
  engineCapacity = signal<number>(0);
  exchangeRate = signal<number>(330);

  vehicleTypes: VehicleType[] = [
    { id: "sedan", name: "Sedan / Saloon Car", dutyRate: 45, exciseRate: 15 },
    { id: "suv", name: "SUV / 4WD", dutyRate: 50, exciseRate: 20 },
    { id: "van", name: "Van / Minibus", dutyRate: 40, exciseRate: 10 },
    {
      id: "truck",
      name: "Truck / Commercial Vehicle",
      dutyRate: 35,
      exciseRate: 8,
    },
    { id: "hybrid", name: "Hybrid Vehicle", dutyRate: 35, exciseRate: 5 },
    { id: "electric", name: "Electric Vehicle", dutyRate: 30, exciseRate: 0 },
  ];

  result = signal<CalculationResult>({
    vehicleValue: 0,
    importDuty: 0,
    dutyableValue: 0,
    vat: 0,
    exciseDuty: 0,
    registrationFee: 0,
    totalCost: 0,
  });

  vehicleValueLkr = signal<number>(0);

  getSelectedVehicle(): VehicleType | undefined {
    return this.vehicleTypes.find((v) => v.id === this.selectedVehicleType());
  }

  updateCalculation(): void {
    const vehicle = this.getSelectedVehicle();
    const valueUsd = this.vehicleValueUsd();
    const rate = this.exchangeRate();

    if (!vehicle || valueUsd <= 0) {
      return;
    }

    const vehicleValueLkr = valueUsd * rate;
    this.vehicleValueLkr.set(vehicleValueLkr);

    const importDuty = vehicleValueLkr * (vehicle.dutyRate / 100);
    const dutyableValue = vehicleValueLkr + importDuty;
    const vat = dutyableValue * 0.08;
    const exciseDuty = vehicleValueLkr * (vehicle.exciseRate / 100);
    const registrationFee = 20000;

    const totalCost =
      vehicleValueLkr + importDuty + vat + exciseDuty + registrationFee;

    this.result.set({
      vehicleValue: vehicleValueLkr,
      importDuty: Math.round(importDuty),
      dutyableValue: Math.round(dutyableValue),
      vat: Math.round(vat),
      exciseDuty: Math.round(exciseDuty),
      registrationFee: registrationFee,
      totalCost: Math.round(totalCost),
    });
  }

  hasError(): boolean {
    return !this.selectedVehicleType() || this.vehicleValueUsd() <= 0;
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat("en-US").format(Math.round(value));
  }

  resetCalculator(): void {
    this.selectedVehicleType.set("");
    this.vehicleValueUsd.set(0);
    this.engineCapacity.set(0);
    this.exchangeRate.set(330);
    this.vehicleValueLkr.set(0);
    this.result.set({
      vehicleValue: 0,
      importDuty: 0,
      dutyableValue: 0,
      vat: 0,
      exciseDuty: 0,
      registrationFee: 0,
      totalCost: 0,
    });
  }
}
