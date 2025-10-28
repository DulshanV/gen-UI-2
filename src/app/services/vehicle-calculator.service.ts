import { Injectable } from '@angular/core';

export type VehicleType = 'private_car' | 'commercial' | 'motorcycle' | 'electric' | 'hybrid';

export interface RatesConfig {
  generalDutyRate: number; // e.g. 0.2
  vatRate: number; // e.g. 0.15
  palRate: number; // 0.01
  cessRate: number; // 0.005
  ssclRate: number; // 0.0
  exciseRules?: Record<VehicleType, Array<{ minCc?: number; maxCc?: number; rate?: number; flat?: number }>>;
}

export interface CalculatorConfig {
  rates: RatesConfig;
  deMinimis?: { cifThreshold?: number };
}

export interface VehicleInput {
  declaredPrice: number | null; // in foreign currency if exchangeRate provided; if exchangeRate missing, assumed LKR
  exchangeRate: number | null; // required if declaredPrice is not LKR; must be > 0
  cifOverrideLkr?: number | null; // optional explicit CIF in LKR
  freight?: number | null; // in LKR
  insurance?: number | null; // in LKR
  engineCc: number | null;
  yearOfManufacture?: number | null;
  vehicleType: VehicleType;
  isUsed: boolean;
  additionalFees?: { portHandling?: number | null; extraInsurance?: number | null; other?: number | null };
}

export interface TaxItem {
  key: string;
  label: string;
  base: number;
  rate?: number;
  amount: number;
  formula: string;
}

export interface CalculationResult {
  cif: number;
  taxes: TaxItem[];
  subtotalTaxes: number;
  totalPayable: number; // taxes + fees
  totalFees: number;
  netLandedCost: number; // cif + taxes + fees
}

@Injectable({ providedIn: 'root' })
export class VehicleCalculatorService {
  validate(input: VehicleInput): string[] {
    const errors: string[] = [];
    if ((input.cifOverrideLkr == null || input.cifOverrideLkr <= 0) && (input.declaredPrice == null || input.declaredPrice <= 0)) {
      errors.push('Declared price or CIF is required.');
    }
    if ((input.cifOverrideLkr == null || input.cifOverrideLkr <= 0) && (input.exchangeRate == null || input.exchangeRate <= 0)) {
      errors.push('Valid exchange rate is required when using declared price.');
    }
    if (input.engineCc == null || input.engineCc < 0) {
      errors.push('Engine capacity (cc) must be provided and non-negative.');
    }
    return errors;
  }

  private determineExciseRate(vehicleType: VehicleType, engineCc: number, cfg: CalculatorConfig): { rate: number; note: string } {
    const rules = cfg.rates.exciseRules?.[vehicleType];
    if (!rules || rules.length === 0) return { rate: 0, note: 'No excise for this type' };
    const rule = rules.find(r => (r.minCc == null || engineCc >= r.minCc) && (r.maxCc == null || engineCc <= r.maxCc));
    if (!rule) return { rate: 0, note: 'No matching excise rule' };
    if (rule.rate != null) return { rate: rule.rate, note: `Excise rate ${Math.round(rule.rate * 10000) / 100}%` };
    return { rate: 0, note: 'Flat excise not supported in default calc' };
  }

  computeCifLkr(input: VehicleInput): number {
    const base = input.cifOverrideLkr && input.cifOverrideLkr > 0
      ? input.cifOverrideLkr
      : ((input.declaredPrice || 0) * (input.exchangeRate || 0));
    const freight = input.freight || 0;
    const insurance = input.insurance || 0;
    const cif = base + freight + insurance;
    return isFinite(cif) && cif > 0 ? round2(cif) : 0;
  }

  calculate(input: VehicleInput, cfg: CalculatorConfig): CalculationResult {
    const errors = this.validate(input);
    if (errors.length) {
      throw new Error(errors.join(' '));
    }

    const cif = this.computeCifLkr(input);

    // De-minimis: allow external handling; here we still compute but could short-circuit if desired.
    const taxes: TaxItem[] = [];

    // General Duty
    const dutyBase = cif;
    const duty = round2(dutyBase * cfg.rates.generalDutyRate);
    taxes.push({ key: 'duty', label: 'General Duty', base: dutyBase, rate: cfg.rates.generalDutyRate, amount: duty, formula: `CIF × ${pct(cfg.rates.generalDutyRate)}` });

    // Excise (engine/age based)
    const { rate: exciseRate } = this.determineExciseRate(input.vehicleType, input.engineCc || 0, cfg);
    const exciseBase = cif; // configurable; default base is CIF
    const excise = round2(exciseBase * exciseRate);
    taxes.push({ key: 'excise', label: 'Excise/Levy', base: exciseBase, rate: exciseRate, amount: excise, formula: `CIF × ${pct(exciseRate)}` });

    // PAL, Cess, SSCL
    const pal = round2(cif * cfg.rates.palRate);
    taxes.push({ key: 'pal', label: 'PAL', base: cif, rate: cfg.rates.palRate, amount: pal, formula: `CIF × ${pct(cfg.rates.palRate)}` });

    const cess = round2(cif * cfg.rates.cessRate);
    taxes.push({ key: 'cess', label: 'Cess', base: cif, rate: cfg.rates.cessRate, amount: cess, formula: `CIF × ${pct(cfg.rates.cessRate)}` });

    const sscl = round2(cif * cfg.rates.ssclRate);
    taxes.push({ key: 'sscl', label: 'SSCL', base: cif, rate: cfg.rates.ssclRate, amount: sscl, formula: `CIF × ${pct(cfg.rates.ssclRate)}` });

    // VAT on sum of taxable components
    const vatBase = cif + duty + excise + pal + cess + sscl;
    const vat = round2(vatBase * cfg.rates.vatRate);
    taxes.push({ key: 'vat', label: 'VAT', base: vatBase, rate: cfg.rates.vatRate, amount: vat, formula: `(CIF + Duty + Excise + PAL + Cess + SSCL) × ${pct(cfg.rates.vatRate)}` });

    const subtotalTaxes = round2(taxes.reduce((s, t) => s + t.amount, 0));

    const fees = (input.additionalFees?.portHandling || 0) + (input.additionalFees?.extraInsurance || 0) + (input.additionalFees?.other || 0);
    const totalFees = round2(fees);

    const totalPayable = round2(subtotalTaxes + totalFees);
    const netLandedCost = round2(cif + subtotalTaxes + totalFees);

    return { cif, taxes, subtotalTaxes, totalPayable, totalFees, netLandedCost };
  }
}

function pct(n: number): string { return `${(n * 100).toFixed(2)}%`; }
function round2(n: number): number { return Math.round((n + Number.EPSILON) * 100) / 100; }
