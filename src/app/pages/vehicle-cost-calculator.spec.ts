import { TestBed } from '@angular/core/testing';
import { VehicleCostCalculatorPage } from './vehicle-cost-calculator';
import { VehicleCalculatorService, CalculationResult } from '../services/vehicle-calculator.service';
import { ContentAdapterService } from '../services/content-adapter.service';

class MockCalcService {
  calculate() {
    const mock: CalculationResult = {
      cif: 100,
      taxes: [
        { key: 'duty', label: 'General Duty', base: 100, rate: 0.2, amount: 20, formula: 'CIF × 20%' },
        { key: 'vat', label: 'VAT', base: 120, rate: 0.15, amount: 18, formula: '(CIF + Duty) × 15%' },
      ],
      subtotalTaxes: 38,
      totalPayable: 38,
      totalFees: 0,
      netLandedCost: 138,
    };
    return mock;
  }
}

class MockContentService {
  load() {
    return {
      hero: { title: { value: 'T' }, subtitle: { value: 'S' }, imageUrl: { value: '' } },
      intro: { body: { value: 'Intro' }, review_required: false },
      form: {
        cif: { label: 'CIF' }, currency: { label: 'Currency' }, exchangeRate: { label: 'Rate' }, freight: { label: 'Freight' }, insurance: { label: 'Insurance' }, engineCc: { label: 'CC' }, year: { label: 'Year' }, vehicleType: { label: 'Type' }, isUsed: { label: 'Used' }, exemptions: { label: 'Ex' }, fees: { label: 'Fees' }
      },
      rates: { generalDutyRate: { value: 0.2 }, vatRate: { value: 0.15 }, palRate: { value: 0 }, cessRate: { value: 0 }, ssclRate: { value: 0 }, exciseRules: { value: { private_car: [ { rate: 0 } ] } }, deMinimis: { value: {} } },
      faq: [],
      ctas: { primaryText: '', primaryHref: '', contactText: 'Contact', contactHref: '/contact' },
    } as any;
  }
}

describe('VehicleCostCalculatorPage (component)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleCostCalculatorPage],
      providers: [
        { provide: VehicleCalculatorService, useClass: MockCalcService },
        { provide: ContentAdapterService, useClass: MockContentService },
      ]
    }).compileComponents();
  });

  it('renders results after onCalculate using mocked service', () => {
    const fixture = TestBed.createComponent(VehicleCostCalculatorPage);
    fixture.detectChanges();

    const comp = fixture.componentInstance;
    comp.onCalculate({} as any);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Summary');
    expect(el.textContent).toContain('Total Taxes');
  });
});
