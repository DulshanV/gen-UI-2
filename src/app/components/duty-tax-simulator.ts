import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DutyTaxCalculation } from '../data/search-mock';

@Component({
  selector: 'app-duty-tax-simulator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg border border-slate-200 p-6">
      <h3 class="text-xl font-bold text-slate-900 mb-6">Duty & Tax Simulator</h3>

      <!-- Input Form -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-slate-200">
        <!-- CIF Value Input -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-2">
            CIF Value (LKR)
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              ₨
            </span>
            <input
              type="number"
              [(ngModel)]="cifValue"
              (input)="calculateTaxes()"
              min="0"
              step="1000"
              placeholder="Enter CIF value in LKR"
              class="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
          <p class="text-xs text-slate-500 mt-2">
            Include Cost, Insurance, and Freight
          </p>
        </div>

        <!-- Quantity Input -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-2">
            Quantity (Units)
          </label>
          <input
            type="number"
            [(ngModel)]="quantity"
            (input)="calculateTaxes()"
            min="0"
            step="1"
            placeholder="Enter quantity"
            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
          />
          <p class="text-xs text-slate-500 mt-2">
            Number of units being imported
          </p>
        </div>
      </div>

      <!-- Tax Breakdown -->
      <div class="space-y-4">
        <!-- CIF Value -->
        <div class="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
          <span class="text-slate-700 font-medium">CIF Value (Base)</span>
          <span class="text-slate-900 font-semibold">₨ {{ cifValue | number: '1.2-2' }}</span>
        </div>

        <!-- Customs Duty -->
        <div class="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div>
            <span class="text-slate-700 font-medium">Customs Duty</span>
            <p class="text-xs text-slate-500 mt-1">{{ customsDutyRate * 100 }}% of CIF</p>
          </div>
          <span class="text-blue-900 font-semibold">₨ {{ customsDuty | number: '1.2-2' }}</span>
        </div>

        <!-- Subtotal after Customs Duty -->
        <div class="flex justify-between items-center p-4 bg-slate-100 rounded-lg border border-slate-300">
          <span class="text-slate-800 font-semibold">Subtotal (CIF + Duty)</span>
          <span class="text-slate-900 font-bold">₨ {{ subtotalAfterDuty | number: '1.2-2' }}</span>
        </div>

        <!-- Excise Duty (PAL) -->
        <div *ngIf="palRate > 0" class="flex justify-between items-center p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div>
            <span class="text-slate-700 font-medium">Excise Duty (PAL)</span>
            <p class="text-xs text-slate-500 mt-1">{{ palRate * 100 }}% of CIF</p>
          </div>
          <span class="text-orange-900 font-semibold">₨ {{ palDuty | number: '1.2-2' }}</span>
        </div>

        <!-- Cess -->
        <div *ngIf="cessRate > 0" class="flex justify-between items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div>
            <span class="text-slate-700 font-medium">Cess / Special Tax</span>
            <p class="text-xs text-slate-500 mt-1">{{ cessRate * 100 }}% of CIF</p>
          </div>
          <span class="text-purple-900 font-semibold">₨ {{ cessTax | number: '1.2-2' }}</span>
        </div>

        <!-- VAT (18%) -->
        <div class="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
          <div>
            <span class="text-slate-700 font-medium">Value Added Tax (VAT)</span>
            <p class="text-xs text-slate-500 mt-1">18% of (CIF + All Duties)</p>
          </div>
          <span class="text-green-900 font-semibold">₨ {{ vatAmount | number: '1.2-2' }}</span>
        </div>

        <!-- SSCL (if applicable) -->
        <div *ngIf="ssclAmount > 0" class="flex justify-between items-center p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <div>
            <span class="text-slate-700 font-medium">SSCL (Port Maintenance)</span>
            <p class="text-xs text-slate-500 mt-1">Standard charge per shipment</p>
          </div>
          <span class="text-indigo-900 font-semibold">₨ {{ ssclAmount | number: '1.2-2' }}</span>
        </div>

        <!-- Total Landed Cost -->
        <div class="flex justify-between items-center p-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg border-2 border-slate-700 text-white">
          <span class="text-lg font-bold">Estimated Total Landed Cost</span>
          <span class="text-2xl font-bold">₨ {{ totalLandedCost | number: '1.2-2' }}</span>
        </div>

        <!-- Per Unit Cost -->
        <div *ngIf="quantity > 0" class="text-center text-sm text-slate-600 mt-4">
          Cost per unit: <span class="font-semibold">₨ {{ totalLandedCost / quantity | number: '1.2-2' }}</span>
        </div>
      </div>

      <!-- Note -->
      <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p class="text-xs text-yellow-800">
          <strong>Note:</strong> This is an estimate based on current rates. Actual duties and taxes may vary based on exact classification, origin, and other factors. Always consult with customs officials for accurate calculations.
        </p>
      </div>
    </div>
  `
})
export class DutyTaxSimulatorComponent {
  @Input() hsCode: string = '';
  @Input() rates: DutyTaxCalculation = {
    customsDutyRate: 0,
    vatRate: 0.18,
    cess: 0,
    palRate: 0
  };

  cifValue = 100000;
  quantity = 1;

  customsDutyRate = 0;
  vatRate = 0.18;
  cessRate = 0;
  palRate = 0;

  customsDuty = 0;
  palDuty = 0;
  cessTax = 0;
  vatAmount = 0;
  ssclAmount = 500; // Standard service charge
  subtotalAfterDuty = 0;
  totalLandedCost = 0;

  ngOnInit(): void {
    this.customsDutyRate = this.rates.customsDutyRate;
    this.vatRate = this.rates.vatRate;
    this.cessRate = this.rates.cess;
    this.palRate = this.rates.palRate;
    this.calculateTaxes();
  }

  calculateTaxes(): void {
    // Customs Duty
    this.customsDuty = this.cifValue * this.customsDutyRate;

    // Subtotal after customs duty
    this.subtotalAfterDuty = this.cifValue + this.customsDuty;

    // PAL (Excise Duty)
    this.palDuty = this.cifValue * this.palRate;

    // Cess
    this.cessTax = this.cifValue * this.cessRate;

    // Base for VAT (CIF + All Duties)
    const vatBase = this.subtotalAfterDuty + this.palDuty + this.cessTax;
    this.vatAmount = vatBase * this.vatRate;

    // Total Landed Cost
    this.totalLandedCost =
      this.cifValue +
      this.customsDuty +
      this.palDuty +
      this.cessTax +
      this.vatAmount +
      this.ssclAmount;
  }
}
