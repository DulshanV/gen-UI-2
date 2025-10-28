import { VehicleCalculatorService, CalculatorConfig, VehicleInput } from './vehicle-calculator.service';

describe('VehicleCalculatorService', () => {
  let service: VehicleCalculatorService;
  const baseCfg: CalculatorConfig = {
    rates: {
      generalDutyRate: 0.2,
      vatRate: 0.15,
      palRate: 0,
      cessRate: 0,
      ssclRate: 0,
      exciseRules: {
        private_car: [ { maxCc: 1500, rate: 0.05 }, { minCc: 1501, rate: 0.10 } ],
        motorcycle: [ { maxCc: 200, rate: 0.02 }, { minCc: 201, rate: 0.05 } ],
        commercial: [ { rate: 0.04 } ],
        electric: [ { rate: 0.00 } ],
        hybrid: [ { maxCc: 2000, rate: 0.03 }, { minCc: 2001, rate: 0.06 } ],
      }
    }
  };

  beforeEach(() => {
    service = new VehicleCalculatorService();
  });

  it('Case 1: CIF=3,000,000 LKR, duty 20%, VAT 15% -> expected duty, VAT, total', () => {
    const input: VehicleInput = {
      declaredPrice: null,
      exchangeRate: null,
      cifOverrideLkr: 3_000_000,
      engineCc: 1500,
      vehicleType: 'private_car',
      isUsed: false,
    };

    const result = service.calculate(input, baseCfg);
    const duty = 3_000_000 * 0.2; // 600,000
    const excise = 3_000_000 * 0.05; // 150,000
    const vatBase = 3_000_000 + duty + excise; // 3,750,000
    const vat = +(vatBase * 0.15).toFixed(2); // 562,500
    const totalTaxes = +(duty + excise + vat).toFixed(2);

    expect(result.cif).toBe(3_000_000);
    const dutyItem = result.taxes.find(t => t.key === 'duty');
    const vatItem = result.taxes.find(t => t.key === 'vat');
    const exciseItem = result.taxes.find(t => t.key === 'excise');

    expect(dutyItem?.amount).toBeCloseTo(duty, 2);
    expect(exciseItem?.amount).toBeCloseTo(excise, 2);
    expect(vatItem?.amount).toBeCloseTo(vat, 2);
    expect(result.subtotalTaxes).toBeCloseTo(totalTaxes, 2);
  });

  it('Case 2: Motorcycle vs private car excise differences at same CIF', () => {
    const baseInput = {
      declaredPrice: null,
      exchangeRate: null,
      cifOverrideLkr: 1_000_000,
      isUsed: false,
    } as Partial<VehicleInput>;

    const moto = service.calculate({ ...baseInput, engineCc: 150, vehicleType: 'motorcycle' } as VehicleInput, baseCfg);
    const car = service.calculate({ ...baseInput, engineCc: 1500, vehicleType: 'private_car' } as VehicleInput, baseCfg);

    const motoExcise = 1_000_000 * 0.02;
    const carExcise = 1_000_000 * 0.05;

    expect(moto.taxes.find(t => t.key === 'excise')?.amount).toBeCloseTo(motoExcise, 2);
    expect(car.taxes.find(t => t.key === 'excise')?.amount).toBeCloseTo(carExcise, 2);
    expect(car.taxes.find(t => t.key === 'excise')!.amount).toBeGreaterThan(moto.taxes.find(t => t.key === 'excise')!.amount);
  });

  it('Case 3: Missing exchange rate should fail validation when declaredPrice provided', () => {
    const input: VehicleInput = {
      declaredPrice: 20000, // foreign currency
      exchangeRate: null, // missing
      engineCc: 1000,
      vehicleType: 'private_car',
      isUsed: true,
    };
    expect(() => service.calculate(input, baseCfg)).toThrowError();
  });

  it('Edge: negative inputs and extremely large numbers handled', () => {
    // Negative engine cc -> error
    const bad: VehicleInput = { declaredPrice: 1000, exchangeRate: 300, engineCc: -1, vehicleType: 'commercial', isUsed: false };
    expect(() => service.calculate(bad, baseCfg)).toThrowError();

    // Large number stability
    const large: VehicleInput = { declaredPrice: 10_000_000_000, exchangeRate: 300, engineCc: 2000, vehicleType: 'private_car', isUsed: false };
    const res = service.calculate(large, baseCfg);
    expect(res.cif).toBeGreaterThan(0);
    expect(res.subtotalTaxes).toBeGreaterThan(0);
  });
});
