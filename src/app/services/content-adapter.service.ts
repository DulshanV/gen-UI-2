import { Injectable, WritableSignal, signal } from "@angular/core";

export interface BuilderField<T> {
  value: T;
  review_required?: boolean;
}
export interface HeroContent {
  title: BuilderField<string>;
  subtitle: BuilderField<string>;
  imageUrl: BuilderField<string>;
}
export interface IntroContent {
  body: BuilderField<string>;
  review_required: boolean;
}
export interface LabelContent {
  label: string;
  placeholder?: string;
  help?: string;
}
export interface FormLabelsContent {
  cif: LabelContent;
  currency: LabelContent;
  exchangeRate: LabelContent;
  freight: LabelContent;
  insurance: LabelContent;
  engineCc: LabelContent;
  year: LabelContent;
  vehicleType: LabelContent;
  isUsed: LabelContent;
  exemptions: LabelContent;
  fees: LabelContent;
}
export interface RateFieldsContent {
  generalDutyRate: BuilderField<number>;
  vatRate: BuilderField<number>;
  palRate: BuilderField<number>;
  cessRate: BuilderField<number>;
  ssclRate: BuilderField<number>;
  exciseRules: BuilderField<
    Record<string, Array<{ minCc?: number; maxCc?: number; rate?: number }>>
  >;
  deMinimis: BuilderField<{ cifThreshold?: number }>;
}
export interface FaqItem {
  q: string;
  a: string;
}
export interface CtasContent {
  primaryText: string;
  primaryHref: string;
  contactText: string;
  contactHref: string;
}

export interface VehicleCalculatorContentModel {
  hero: HeroContent;
  intro: IntroContent;
  form: FormLabelsContent;
  rates: RateFieldsContent;
  faq: FaqItem[];
  ctas: CtasContent;
}

const DEFAULTS: VehicleCalculatorContentModel = {
  hero: {
    title: {
      value: "Vehicle Cost & Import Tax Calculator",
      review_required: false,
    },
    subtitle: {
      value:
        "Estimate duties, VAT, levies and total landed cost for imported vehicles in Sri Lanka.",
      review_required: false,
    },
    imageUrl: { value: "", review_required: false },
  },
  intro: {
    body: {
      value:
        "This tool provides an estimate for guidance only. For binding rulings contact the Customs ICT Directorate.",
      review_required: true,
    },
    review_required: true,
  },
  form: {
    cif: {
      label: "Vehicle Price (CIF)",
      placeholder: "Enter CIF or leave blank to compute",
      help: "CIF = Cost + Insurance + Freight",
    },
    currency: { label: "Currency", help: "Currency of declared price" },
    exchangeRate: {
      label: "Exchange Rate",
      placeholder: "e.g., 325.50",
      help: "Must be greater than 0",
    },
    freight: { label: "Freight", placeholder: "Optional" },
    insurance: { label: "Insurance", placeholder: "Optional" },
    engineCc: { label: "Engine Capacity (cc)", placeholder: "e.g., 1500" },
    year: { label: "Year of Manufacture", placeholder: "e.g., 2018" },
    vehicleType: { label: "Vehicle Type" },
    isUsed: { label: "Used Vehicle?" },
    exemptions: { label: "Special Allowances/Exemptions" },
    fees: { label: "Additional Fees" },
  },
  rates: {
    generalDutyRate: { value: 0.2, review_required: true },
    vatRate: { value: 0.15, review_required: true },
    palRate: { value: 0.01, review_required: true },
    cessRate: { value: 0.005, review_required: true },
    ssclRate: { value: 0.0, review_required: true },
    exciseRules: {
      value: {
        private_car: [
          { maxCc: 1500, rate: 0.05 },
          { minCc: 1501, rate: 0.1 },
        ],
        motorcycle: [
          { maxCc: 200, rate: 0.02 },
          { minCc: 201, rate: 0.05 },
        ],
        commercial: [{ rate: 0.04 }],
        electric: [{ rate: 0 }],
        hybrid: [
          { maxCc: 2000, rate: 0.03 },
          { minCc: 2001, rate: 0.06 },
        ],
      },
      review_required: true,
    },
    deMinimis: { value: { cifThreshold: 10000 }, review_required: true },
  },
  faq: [
    {
      q: "Is this a legal determination?",
      a: "No. This is for guidance only. Consult Customs for a binding ruling.",
    },
    { q: "What is CIF?", a: "Cost, Insurance, and Freight." },
  ],
  ctas: {
    primaryText: "Start Calculation",
    primaryHref: "#calculator",
    contactText: "Contact Customs",
    contactHref: "/contact",
  },
};

@Injectable({ providedIn: "root" })
export class ContentAdapterService {
  private contentSig: WritableSignal<VehicleCalculatorContentModel> =
    signal(DEFAULTS);

  // In a real implementation, this would fetch from Builder.io using API key.
  // For offline/dev, we check for a global and otherwise use defaults.
  load(): VehicleCalculatorContentModel {
    const globalAny: any = globalThis as any;
    const injected = globalAny?.BUILDER_VEHICLE_CALC_CONTENT as
      | VehicleCalculatorContentModel
      | undefined;
    if (injected) this.contentSig.set(injected);
    return this.contentSig();
  }
}
