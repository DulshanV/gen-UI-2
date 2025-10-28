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

      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-gov p-8 sticky top-6">
              <h2 class="text-xl font-bold text-gov-dark mb-6">
                Vehicle Details
              </h2>

              <div class="mb-6">
                <label class="block text-sm font-bold text-gov-dark mb-2"
                  >Vehicle Type</label
                >
                <select
                  [ngModel]="selectedVehicleType()"
                  (ngModelChange)="selectedVehicleType.set($event); updateCalculation()"
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
                  <span *ngIf="selectedVehicleType()">
                    Import Duty: {{ getSelectedVehicle()?.dutyRate }}% | Excise:
                    {{ getSelectedVehicle()?.exciseRate }}%
                  </span>
                </p>
              </div>

              <div class="mb-6">
                <label class="block text-sm font-bold text-gov-dark mb-2"
                  >Engine Capacity (CC)</label
                >
                <input
                  type="number"
                  [ngModel]="engineCapacity()"
                  (ngModelChange)="engineCapacity.set($event ? +$event : null)"
                  placeholder="e.g., 1500"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-primary"
                />
                <p class="text-xs text-gray-600 mt-1">
                  Optional - for reference only
                </p>
              </div>

              <div class="mb-6">
                <label class="block text-sm font-bold text-gov-dark mb-2"
                  >Vehicle Value (USD CIF)</label
                >
                <div class="flex items-center">
                  <span class="text-gray-600 mr-2">$</span>
                  <input
                    type="number"
                    [ngModel]="vehicleValueUsd()"
                    (ngModelChange)="vehicleValueUsd.set($event ? +$event : null); updateCalculation()"
                    placeholder="Enter in USD"
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-primary"
                  />
                </div>
                <p class="text-xs text-gray-600 mt-1">
                  Cost, Insurance & Freight value
                </p>
              </div>

              <div class="mb-6">
                <label class="block text-sm font-bold text-gov-dark mb-2"
                  >Exchange Rate (USD to LKR)</label
                >
                <div class="flex items-center">
                  <span class="text-gray-600 mr-2">LKR</span>
                  <input
                    type="number"
                    [ngModel]="exchangeRate()"
                    (ngModelChange)="exchangeRate.set($event ? +$event : 330); updateCalculation()"
                    placeholder="e.g., 330"
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-primary"
                  />
                  <span class="text-gray-600 ml-2">/USD</span>
                </div>
                <p class="text-xs text-gray-600 mt-1">
                  Current official rate (update as needed)
                </p>
              </div>

              <button
                (click)="resetCalculator()"
                class="w-full mt-3 bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                Reset
              </button>
            </div>
          </div>

          <div class="lg:col-span-2">
            <div *ngIf="!hasError(); else errorState">
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
                <p
