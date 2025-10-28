import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleInput, VehicleType } from '../../services/vehicle-calculator.service';

export interface FormLabelsContent {
  cif: { label: string; placeholder?: string; help?: string };
  currency: { label: string; help?: string };
  exchangeRate: { label: string; placeholder?: string; help?: string };
  freight: { label: string; placeholder?: string };
  insurance: { label: string; placeholder?: string };
  engineCc: { label: string; placeholder?: string };
  year: { label: string; placeholder?: string };
  vehicleType: { label: string };
  isUsed: { label: string };
  exemptions: { label: string };
  fees: { label: string };
}

const DEFAULT_LABELS: FormLabelsContent = {
  cif: { label: 'Vehicle Price (CIF)', placeholder: 'Enter CIF or leave blank to compute', help: 'CIF = Cost + Insurance + Freight' },
  currency: { label: 'Currency', help: 'Currency of declared price' },
  exchangeRate: { label: 'Exchange Rate', placeholder: 'e.g., 325.50', help: 'Must be greater than 0' },
  freight: { label: 'Freight', placeholder: 'Optional' },
  insurance: { label: 'Insurance', placeholder: 'Optional' },
  engineCc: { label: 'Engine Capacity (cc)', placeholder: 'e.g., 1500' },
  year: { label: 'Year of Manufacture', placeholder: 'e.g., 2018' },
  vehicleType: { label: 'Vehicle Type' },
  isUsed: { label: 'Used Vehicle?' },
  exemptions: { label: 'Special Allowances/Exemptions' },
  fees: { label: 'Additional Fees' },
};

@Component({
  selector: 'app-calculator-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4" aria-describedby="form-help">
      <div>
        <label for="currency" class="block text-sm font-medium text-gov-dark">{{ labels.currency.label }}</label>
        <select id="currency" formControlName="currency" class="mt-1 w-full border-gray-300 rounded-lg p-2">
          <option *ngFor="let c of currencies" [value]="c">{{ c }}</option>
        </select>
        <p class="text-xs text-gray-600" id="form-help">{{ labels.currency.help }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="declaredPrice" class="block text-sm font-medium text-gov-dark">Declared Price</label>
          <input id="declaredPrice" type="number" step="0.01" formControlName="declaredPrice" class="mt-1 w-full border-gray-300 rounded-lg p-2" placeholder="Price in selected currency" />
        </div>
        <div>
          <label for="exchangeRate" class="block text-sm font-medium text-gov-dark">{{ labels.exchangeRate.label }}</label>
          <input id="exchangeRate" type="number" step="0.0001" formControlName="exchangeRate" class="mt-1 w-full border-gray-300 rounded-lg p-2" [placeholder]="labels.exchangeRate.placeholder" />
          <span *ngIf="form.controls['exchangeRate'].invalid && form.controls['exchangeRate'].touched" class="text-xs text-gov-alert">{{ labels.exchangeRate.help }}</span>
        </div>
      </div>

      <div>
        <label for="cifOverrideLkr" class="block text-sm font-medium text-gov-dark">{{ labels.cif.label }}</label>
        <input id="cifOverrideLkr" type="number" step="0.01" formControlName="cifOverrideLkr" class="mt-1 w-full border-gray-300 rounded-lg p-2" [placeholder]="labels.cif.placeholder" />
        <p class="text-xs text-gray-600">{{ labels.cif.help }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="freight" class="block text-sm font-medium text-gov-dark">{{ labels.freight.label }}</label>
          <input id="freight" type="number" step="0.01" formControlName="freight" class="mt-1 w-full border-gray-300 rounded-lg p-2" [placeholder]="labels.freight.placeholder" />
        </div>
        <div>
          <label for="insurance" class="block text-sm font-medium text-gov-dark">{{ labels.insurance.label }}</label>
          <input id="insurance" type="number" step="0.01" formControlName="insurance" class="mt-1 w-full border-gray-300 rounded-lg p-2" [placeholder]="labels.insurance.placeholder" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="engineCc" class="block text-sm font-medium text-gov-dark">{{ labels.engineCc.label }}</label>
          <input id="engineCc" type="number" formControlName="engineCc" class="mt-1 w-full border-gray-300 rounded-lg p-2" [placeholder]="labels.engineCc.placeholder" required />
        </div>
        <div>
          <label for="yearOfManufacture" class="block text-sm font-medium text-gov-dark">{{ labels.year.label }}</label>
          <input id="yearOfManufacture" type="number" formControlName="yearOfManufacture" class="mt-1 w-full border-gray-300 rounded-lg p-2" [placeholder]="labels.year.placeholder" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="vehicleType" class="block text-sm font-medium text-gov-dark">{{ labels.vehicleType.label }}</label>
          <select id="vehicleType" formControlName="vehicleType" class="mt-1 w-full border-gray-300 rounded-lg p-2">
            <option value="private_car">Private Car</option>
            <option value="commercial">Commercial</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="electric">Electric</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div class="flex items-center gap-2 mt-6">
          <input id="isUsed" type="checkbox" formControlName="isUsed" class="h-4 w-4" />
          <label for="isUsed" class="text-sm font-medium text-gov-dark">{{ labels.isUsed.label }}</label>
        </div>
      </div>

      <fieldset class="border border-gray-200 rounded-lg p-4">
        <legend class="text-sm font-semibold text-gov-dark">{{ labels.fees.label }}</legend>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="portHandling" class="block text-sm">Port Handling</label>
            <input id="portHandling" type="number" step="0.01" formControlName="portHandling" class="mt-1 w-full border-gray-300 rounded-lg p-2" />
          </div>
          <div>
            <label for="extraInsurance" class="block text-sm">Extra Insurance</label>
            <input id="extraInsurance" type="number" step="0.01" formControlName="extraInsurance" class="mt-1 w-full border-gray-300 rounded-lg p-2" />
          </div>
          <div>
            <label for="otherFees" class="block text-sm">Other Fees</label>
            <input id="otherFees" type="number" step="0.01" formControlName="otherFees" class="mt-1 w-full border-gray-300 rounded-lg p-2" />
          </div>
        </div>
      </fieldset>

      <div class="flex gap-3">
        <button type="submit" class="bg-gov-accent hover:bg-yellow-600 text-white px-4 py-2 rounded font-semibold">Calculate</button>
        <button type="button" (click)="reset()" class="bg-white border border-gray-300 text-gov-dark px-4 py-2 rounded font-semibold">Reset</button>
      </div>

      <div *ngIf="error" class="text-gov-alert text-sm" role="alert" aria-live="assertive">{{ error }}</div>
    </form>
  `,
})
export class CalculatorFormComponent implements OnChanges {
  @Input() labels: FormLabelsContent = DEFAULT_LABELS;
  @Input() currencies: string[] = ['LKR', 'USD', 'EUR'];
  @Output() calculate = new EventEmitter<VehicleInput>();

  error: string | null = null;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      currency: ['LKR', Validators.required],
      declaredPrice: [null],
      exchangeRate: [null],
      cifOverrideLkr: [null],
      freight: [null],
      insurance: [null],
      engineCc: [null, [Validators.required, Validators.min(0)]],
      yearOfManufacture: [null],
      vehicleType: ['private_car' as VehicleType, Validators.required],
      isUsed: [false],
      portHandling: [null],
      extraInsurance: [null],
      otherFees: [null],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  submit(): void {
    this.error = null;
    const val = this.form.value;
    const input: VehicleInput = {
      declaredPrice: numberOrNull(val.declaredPrice),
      exchangeRate: numberOrNull(val.exchangeRate),
      cifOverrideLkr: numberOrNull(val.cifOverrideLkr),
      freight: numberOrNull(val.freight),
      insurance: numberOrNull(val.insurance),
      engineCc: numberOrNull(val.engineCc),
      yearOfManufacture: numberOrNull(val.yearOfManufacture),
      vehicleType: val.vehicleType,
      isUsed: !!val.isUsed,
      additionalFees: {
        portHandling: numberOrNull(val.portHandling),
        extraInsurance: numberOrNull(val.extraInsurance),
        other: numberOrNull(val.otherFees),
      },
    };

    // Basic inline validation for UX; service does final validation
    if ((!input.cifOverrideLkr || input.cifOverrideLkr <= 0) && (!input.declaredPrice || !input.exchangeRate || input.exchangeRate <= 0)) {
      this.error = 'Enter CIF or provide declared price with a valid exchange rate.';
      return;
    }

    this.calculate.emit(input);
  }

  reset(): void { this.form.reset({ currency: 'LKR', vehicleType: 'private_car', isUsed: false }); }
}

function numberOrNull(v: any): number | null { const n = typeof v === 'string' ? parseFloat(v) : v; return n == null || isNaN(n) ? null : n; }
