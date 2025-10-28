export interface TariffRate {
  ap?: string;
  ad?: string;
  bn?: string;
  gt?: string;
  in?: string;
  pk?: string;
  sa?: string;
  sf?: string;
  sd?: string;
  sg?: string;
  gen?: string;
  sscl?: string;
  palGen?: string;
  palSg?: string;
  cess?: string;
  excise?: string;
  vat?: string;
}

export interface CommodityCode {
  hsCode: string;
  description: string;
  unit?: string;
  iclSls?: string;
  rates: TariffRate;
  chapter: number;
  section: string;
  notes?: string;
  regulatoryStatus: 'prohibited' | 'restricted' | 'free';
}

export interface Chapter {
  number: number;
  title: string;
  section: string;
  note?: string;
}

export const chapters: Chapter[] = [
  {
    number: 1,
    title: 'Live Animals',
    section: 'SECTION I - LIVE ANIMALS; ANIMAL PRODUCTS',
    note: 'This Chapter covers all live animals except fish, crustaceans, molluscs, micro-organisms, and animals of heading 95.08.'
  }
];

export const commodityCodes: CommodityCode[] = [
  // Chapter 1 - Live animals
  {
    hsCode: '0101.21',
    description: 'Live horses - Pure-bred breeding animals',
    unit: 'u',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'free',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: '5%',
      bn: '4.5%',
      gt: 'Free',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    }
  },
  {
    hsCode: '0101.29',
    description: 'Live horses - Other',
    unit: 'u',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'free',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: 'Free',
      gt: 'Free',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    }
  },
  {
    hsCode: '0101.30',
    description: 'Live asses',
    unit: 'u',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'free',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: 'Free',
      gt: 'Free',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    }
  },
  {
    hsCode: '0101.90',
    description: 'Live horses, asses, mules and hinnies - Other',
    unit: 'u',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'free',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: 'Free',
      gt: 'Free',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    }
  },
  {
    hsCode: '0102.21',
    description: 'Live bovine animals - Pure-bred breeding cattle',
    unit: 'u',
    iclSls: 'L',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'free',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: 'Free',
      gt: 'Free',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: 'Ex'
    }
  },
  {
    hsCode: '0102.29',
    description: 'Live bovine animals - Other cattle',
    unit: 'u',
    iclSls: 'L',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'free',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: 'Free',
      gt: 'Free',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    }
  },
  {
    hsCode: '0102.31',
    description: 'Live bovine animals - Pure-bred breeding buffalo',
    unit: 'u',
    iclSls: 'L',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'free',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: 'Free',
      gt: 'Free',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    }
  },
  {
    hsCode: '0102.39',
    description: 'Live bovine animals - Other buffalo',
    unit: 'u',
    iclSls: 'L',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'free',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: 'Free',
      gt: 'Free',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    }
  },
  {
    hsCode: '0102.90',
    description: 'Live bovine animals - Other',
    unit: 'u',
    iclSls: 'L',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'free',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: 'Free',
      gt: 'Free',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    }
  },
  {
    hsCode: '0103.10',
    description: 'Live Swine - Pure-bred breeding animals',
    unit: 'u',
    iclSls: 'L',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'restricted',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: 'Free',
      gt: 'Free',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    },
    notes: 'Swine imports require specific approvals from Ministry of Livestock.'
  },
  {
    hsCode: '0103.91',
    description: 'Live Swine - Other, weighing less than 50 kg',
    unit: 'u',
    iclSls: 'L',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'restricted',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: '5%',
      bn: '5%',
      gt: '20%',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    },
    notes: 'Swine imports require specific approvals from Ministry of Livestock.'
  },
  {
    hsCode: '0103.92',
    description: 'Live Swine - Other, weighing 50 kg or more',
    unit: 'u',
    iclSls: 'L',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'restricted',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: '20%',
      bn: 'Free',
      gt: 'Free',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    },
    notes: 'Swine imports require specific approvals from Ministry of Livestock.'
  },
  {
    hsCode: '0104.10.10',
    description: 'Live sheep and goats - Sheep - Pure-bred breeding animals',
    unit: 'u',
    iclSls: 'L',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'free',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: 'Free',
      gt: 'Free',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    }
  },
  {
    hsCode: '0104.10.90',
    description: 'Live sheep and goats - Sheep - Other',
    unit: 'u',
    iclSls: 'L',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'free',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: '5%',
      bn: '20%',
      gt: 'Free',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    }
  },
  {
    hsCode: '0104.20.10',
    description: 'Live sheep and goats - Goats - Pure-bred breeding animals',
    unit: 'u',
    iclSls: 'L',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'free',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: 'Free',
      gt: 'Free',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: 'Ex'
    }
  },
  {
    hsCode: '0104.20.90',
    description: 'Live sheep and goats - Goats - Other',
    unit: 'u',
    iclSls: 'L',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'free',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: 'Free',
      gt: 'Free',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    }
  },
  {
    hsCode: '0105.11.10',
    description: 'Live poultry - Fowls - Day-old chicks for breeding',
    unit: 'u',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'free',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: 'Free',
      gt: 'Free',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    }
  },
  {
    hsCode: '0105.11.20',
    description: 'Live poultry - Fowls - Other Day-old chicks',
    unit: 'u',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'free',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: 'Free',
      gt: 'Free',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    }
  },
  {
    hsCode: '0105.11.90',
    description: 'Live poultry - Fowls - Other',
    unit: 'u',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'free',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: 'Free',
      gt: 'Free',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    }
  },
  {
    hsCode: '0106.11',
    description: 'Other live animals - Mammals - Primates',
    unit: 'u',
    iclSls: 'L',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'restricted',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: '5%',
      gt: '5%',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    },
    notes: 'Primate imports require CITES permits and approval from Department of Wildlife.'
  },
  {
    hsCode: '0106.12',
    description: 'Other live animals - Mammals - Whales, dolphins, porpoises, manatees, dugongs, seals, sea lions, walruses',
    unit: 'u',
    iclSls: 'L',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'prohibited',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: '5%',
      gt: '5%',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    },
    notes: 'Protected marine mammals - strictly prohibited under CITES and international marine conservation agreements.'
  },
  {
    hsCode: '0106.31',
    description: 'Other live animals - Birds - Birds of prey',
    unit: 'u',
    iclSls: 'L',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'restricted',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: '5%',
      gt: '5%',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    },
    notes: 'Birds of prey require CITES permits and Department of Wildlife approval.'
  },
  {
    hsCode: '0106.32',
    description: 'Other live animals - Birds - Psittaciformes (parrots, parakeets, macaws, cockatoos)',
    unit: 'u',
    iclSls: 'L',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'restricted',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: '5%',
      gt: '5%',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    },
    notes: 'Parrot species require CITES permits and Department of Wildlife approval.'
  },
  {
    hsCode: '0106.41',
    description: 'Other live animals - Insects - Bees',
    unit: 'u',
    chapter: 1,
    section: 'I',
    regulatoryStatus: 'free',
    rates: {
      sg: 'Free',
      ap: 'Free',
      ad: 'Free',
      bn: '5%',
      gt: '5%',
      in: 'Free',
      pk: 'Free',
      sa: '18%',
      sf: 'Ex',
      sd: 'Ex',
      gen: 'Free',
      vat: '18%',
      sscl: '2.5%'
    }
  }
];

export function getCommodityByHSCode(hsCode: string): CommodityCode | undefined {
  return commodityCodes.find(item => item.hsCode === hsCode);
}

export function getCommoditiesByChapter(chapterNumber: number): CommodityCode[] {
  return commodityCodes.filter(item => item.chapter === chapterNumber);
}

export function searchCommodities(query: string): CommodityCode[] {
  const lowerQuery = query.toLowerCase();
  return commodityCodes.filter(item =>
    item.hsCode.includes(query) ||
    item.description.toLowerCase().includes(lowerQuery)
  );
}
