export interface SearchSuggestion {
  hsCode: string;
  commodityName: string;
  description: string;
  regulatoryStatus: 'prohibited' | 'restricted' | 'free';
}

export const searchMockData: SearchSuggestion[] = [
  {
    hsCode: '8703.23.90',
    commodityName: 'Used Motor Cars',
    description: 'Used Motor Cars, spark-ignition engine > 1500cc',
    regulatoryStatus: 'restricted'
  },
  {
    hsCode: '8803.90.00',
    commodityName: 'Aircraft & Drones',
    description: 'Parts and accessories of aircraft, including unmanned aerial vehicles',
    regulatoryStatus: 'restricted'
  },
  {
    hsCode: '3004.90.00',
    commodityName: 'Pharmaceuticals',
    description: 'Medicaments (excluding goods of heading 3002, 3005 or 3006) consisting of mixed or unmixed products for therapeutic or prophylactic uses',
    regulatoryStatus: 'restricted'
  },
  {
    hsCode: '2106.10.00',
    commodityName: 'Protein Products',
    description: 'Protein concentrates and textured protein substances',
    regulatoryStatus: 'restricted'
  },
  {
    hsCode: '4202.21.00',
    commodityName: 'Travel Goods',
    description: 'Trunks, suitcases, vanity cases, executive-cases, brief-cases, school satchels, spectacle cases',
    regulatoryStatus: 'free'
  },
  {
    hsCode: '6204.62.00',
    commodityName: 'Women Clothing',
    description: "Women's or girls' suits, ensembles, jackets, blazers, trousers, bib and brace overalls, breeches and shorts",
    regulatoryStatus: 'free'
  },
  {
    hsCode: '6109.10.00',
    commodityName: 'Cotton T-shirts',
    description: 'T-shirts, singlets and other vests, knitted or crocheted, of cotton',
    regulatoryStatus: 'free'
  },
  {
    hsCode: '2710.19.99',
    commodityName: 'Petroleum Products',
    description: 'Petroleum oils and oils obtained from bituminous minerals, not crude; preparations',
    regulatoryStatus: 'restricted'
  },
  {
    hsCode: '2933.39.90',
    commodityName: 'Chemicals - Heterocyclic',
    description: 'Heterocyclic compounds with nitrogen hetero-atom(s) only (other than isoquinoline, tetrahydroquinoline, levorphanol)',
    regulatoryStatus: 'free'
  },
  {
    hsCode: '0302.13.00',
    commodityName: 'Fresh Fish',
    description: 'Fish, fresh or chilled, excluding salmonidae and other specified fish',
    regulatoryStatus: 'restricted'
  }
];

export interface RegulatoryDetail {
  oga: string;
  requirement: string;
  status: 'mandatory' | 'conditional' | 'optional';
  actionLink: string;
}

export const regulatoryDetails: Record<string, RegulatoryDetail[]> = {
  '8703.23.90': [
    {
      oga: 'Central Environmental Authority (CEA)',
      requirement: 'Environmental Approval & Vehicle Registration',
      status: 'mandatory',
      actionLink: 'https://www.cea.lk'
    },
    {
      oga: 'Sri Lanka Standards Institution (SLSI)',
      requirement: 'Motor Vehicle Safety Certificate',
      status: 'mandatory',
      actionLink: 'https://www.slsi.lk'
    },
    {
      oga: 'National Automobile Authority (NAA)',
      requirement: 'Import Approval & Registration',
      status: 'mandatory',
      actionLink: 'https://www.naa.lk'
    }
  ],
  '8803.90.00': [
    {
      oga: 'Civil Aviation Authority of Sri Lanka (CAASL)',
      requirement: 'Aircraft / Drone Import Approval',
      status: 'mandatory',
      actionLink: 'https://www.caasl.gov.lk'
    },
    {
      oga: 'Ministry of Defense',
      requirement: 'Security Clearance (for military-use aircraft)',
      status: 'conditional',
      actionLink: 'https://www.defence.lk'
    }
  ],
  '3004.90.00': [
    {
      oga: 'National Medicine Regulatory Authority (NMRA)',
      requirement: 'Import License & Product Registration',
      status: 'mandatory',
      actionLink: 'https://www.nmra.gov.lk'
    },
    {
      oga: 'Sri Lanka Standards Institution (SLSI)',
      requirement: 'Quality & Safety Certification',
      status: 'mandatory',
      actionLink: 'https://www.slsi.lk'
    }
  ],
  '0302.13.00': [
    {
      oga: 'Ministry of Fisheries',
      requirement: 'Fish Import Permit',
      status: 'mandatory',
      actionLink: 'https://www.fisheries.gov.lk'
    },
    {
      oga: 'Sri Lanka Standards Institution (SLSI)',
      requirement: 'Food Safety & Quality Inspection',
      status: 'mandatory',
      actionLink: 'https://www.slsi.lk'
    }
  ]
};

export interface DutyTaxCalculation {
  customsDutyRate: number;
  vatRate: number;
  cess: number;
  palRate: number;
}

export const dutyTaxRates: Record<string, DutyTaxCalculation> = {
  '8703.23.90': {
    customsDutyRate: 0.25,
    vatRate: 0.18,
    cess: 0.10,
    palRate: 0.05
  },
  '8803.90.00': {
    customsDutyRate: 0.15,
    vatRate: 0.18,
    cess: 0.08,
    palRate: 0.05
  },
  '3004.90.00': {
    customsDutyRate: 0.10,
    vatRate: 0.18,
    cess: 0.05,
    palRate: 0.05
  },
  '4202.21.00': {
    customsDutyRate: 0.25,
    vatRate: 0.18,
    cess: 0.00,
    palRate: 0.05
  },
  '6204.62.00': {
    customsDutyRate: 0.25,
    vatRate: 0.18,
    cess: 0.00,
    palRate: 0.05
  },
  '0302.13.00': {
    customsDutyRate: 0.10,
    vatRate: 0.18,
    cess: 0.10,
    palRate: 0.05
  }
};

export const classificationNotes: Record<string, string> = {
  '8703.23.90': `Chapter 87 - Vehicles other than Railway or Tramway Rolling-Stock

SECTION XVII - VEHICLES, AIRCRAFT, VESSELS AND ASSOCIATED TRANSPORT EQUIPMENT
Note 1: This Chapter does not cover articles of Chapter 95.

GRI (General Rules of Interpretation):
1. Motor vehicles must be classified based on their engine type and displacement.
2. Used vehicles must be declared at actual market value or CIF value, whichever is higher.
3. Classification follows the nature of the engine (spark-ignition vs. compression-ignition).

General Notes:
- Vehicles imported must comply with environmental standards set by the CEA.
- Engine displacement classification: < 1500cc (lower duty), > 1500cc (higher duty).
- All imported vehicles require roadworthiness and environmental certification.`,

  '8803.90.00': `Chapter 88 - Aircraft, Spacecraft, and Parts Thereof

SECTION XVII - VEHICLES, AIRCRAFT, VESSELS AND ASSOCIATED TRANSPORT EQUIPMENT

GRI (General Rules of Interpretation):
1. Aircraft includes fixed-wing, rotorcraft, and unmanned aerial vehicles (UAVs/Drones).
2. Spare parts and accessories are classified with the parent vehicle.
3. Drones are classified based on weight and intended use.

General Notes:
- Unmanned aerial vehicles (drones) follow specific classification rules based on Maximum Take-Off Weight (MTOW).
- Commercial drones require additional approvals from CAASL.
- Military-use aircraft require Ministry of Defense approval.`,

  '3004.90.00': `Chapter 30 - Pharmaceutical Products

Note 1: This Chapter does not include:
(a) Vaccines prepared from animal blood
(b) Serums, other than immunological serums
(c) Goods of Note 2(a) to 4(a) to this Chapter

GRI (General Rules of Interpretation):
1. Pharmaceuticals must be registered with NMRA prior to importation.
2. Each product requires individual licensing.
3. Generic drugs require bioequivalence certificates.

General Notes:
- All pharmaceutical imports require import licenses.
- Products must be on the approved list maintained by NMRA.
- Shelf life at time of import must not be less than 75% of original shelf life.`,

  '0302.13.00': `Chapter 03 - Fish and Crustaceans

Note 1: This Chapter covers all fish and fish products, whether whole or in parts.

GRI (General Rules of Interpretation):
1. Fish must be classified based on species and preservation method.
2. Fresh fish requires cold chain compliance.
3. Quality standards per SLSI must be met.

General Notes:
- Fresh fish imports require health certificates from exporting country.
- Temperature control and food safety protocols are mandatory.
- SLSI inspection must be completed before release from customs.`
};
