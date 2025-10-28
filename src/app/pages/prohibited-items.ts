import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { HeaderComponent } from "../components/header";

interface ProhibitedItem {
  category: string;
  items: string[];
  description?: string;
}

@Component({
  selector: "app-prohibited-items",
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
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
            Prohibited Items
          </h1>
          <p class="text-gray-600">
            Items that cannot be imported or exported under Sri Lanka Customs
            Ordinance
          </p>
        </div>
      </div>

      <!-- Warning Banner -->
      <div
        class="bg-red-50 border-l-4 border-red-500 p-6 mx-6 my-8 rounded-lg max-w-7xl mx-auto"
      >
        <h3 class="font-bold text-red-900 mb-2">⚠️ Important Notice</h3>
        <p class="text-sm text-red-800">
          Items listed below are completely prohibited from being imported or
          exported. Attempting to import prohibited goods may result in:
        </p>
        <ul class="text-sm text-red-800 mt-3 ml-4 space-y-1">
          <li>• Seizure of goods</li>
          <li>• Heavy financial penalties</li>
          <li>• Criminal prosecution</li>
          <li>• Customs blacklisting</li>
        </ul>
      </div>

      <!-- Prohibited Categories -->
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="space-y-6">
          <div
            *ngFor="let category of prohibitedItems"
            class="bg-white rounded-lg shadow-gov border-l-4 border-red-500 p-6"
          >
            <h2 class="text-xl font-bold text-gov-dark mb-2">
              {{ category.category }}
            </h2>
            <p *ngIf="category.description" class="text-gray-700 text-sm mb-4">
              {{ category.description }}
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                *ngFor="let item of category.items"
                class="bg-red-50 border border-red-200 rounded p-4"
              >
                <p class="text-gray-800 text-sm">• {{ item }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reference Section -->
      <div class="bg-white py-12 border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="text-2xl font-serif font-bold text-gov-dark mb-6">
            Legal References
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gov-light p-6 rounded-lg text-white">
              <h4 class="font-bold mb-2">Schedule B - Customs Ordinance</h4>
              <p class="text-sm opacity-90">
                Table of Prohibitions and Restrictions Inwards and Outwards -
                Complete list of all prohibited items under Sri Lankan law
              </p>
            </div>
            <div class="bg-gov-primary p-6 rounded-lg text-white">
              <h4 class="font-bold mb-2">Contact for Clarification</h4>
              <p class="text-sm opacity-90">
                For specific items or clarification, contact the Customs ICT
                Directorate or your nearest Customs office
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Information Box -->
      <div
        class="bg-amber-50 border border-amber-200 mx-6 my-12 rounded-lg p-6 max-w-7xl mx-auto"
      >
        <h3 class="font-bold text-amber-900 mb-2">Need More Information?</h3>
        <p class="text-sm text-amber-800">
          If you're unsure whether an item is prohibited, contact your Customs
          House Agent (CHA) or the Sri Lanka Customs directly. It's better to
          check before attempting to import.
        </p>
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
export class ProhibitedItemsPage {
  prohibitedItems: ProhibitedItem[] = [
    {
      category: "Religious & Cultural Items",
      description: "Articles with religious imprints, names, or emblems",
      items: [
        "Articles bearing religious pictures, religious names or emblems that may wound religious susceptibilities",
        "Books or pamphlets containing disparaging references to religious teachers or teachings",
        "Newspapers, pamphlets, or books containing matter calculated to lead to acts punishable under Penal Code section 120",
      ],
    },
    {
      category: "Weapons & Ammunition",
      description: "All types of weapons and related equipment",
      items: [
        "Dummy firearms, toy pistols, or articles easily convertible into lethal weapons",
        "Walking-stick guns and guns designed to disguise their true nature",
        "Weapons, armaments, ammunition, explosives, and military vehicles (without ministerial license)",
        "Hand grenades, cartridges, and related ammunition for discharging gas",
      ],
    },
    {
      category: "Currency & Financial Instruments",
      description: "False money and counterfeit items",
      items: [
        "False money or counterfeit sterling coin of non-standard weight or fineness",
        "Cotton, silk or woven goods impressed with imitations of currency notes or stock notes",
      ],
    },
    {
      category: "Food & Agricultural Products",
      description: "Items unfit for human or animal consumption",
      items: [
        "Eggs not stamped indelibly with country of origin",
        "Fish, grain, and articles in damaged, stinking, or offensive condition unfit for food",
        "Meat (fresh or frozen) derived from warm-blooded animals unless with certificate of fitness for human consumption",
      ],
    },
    {
      category: "Obscene Materials",
      description: "Indecent and obscene publications",
      items: [
        "Indecent or obscene prints, paintings, books, cards, lithographs, photographs, engravings or articles",
        "Content determined as obscene by customs authorities",
      ],
    },
    {
      category: "Specialized Items",
      description: "Other prohibited items",
      items: [
        "Japanese shaving brushes",
        "Lottery proposals, circulars, or tickets",
        "Mattur dhal (Lathyrus Sativus) otherwise known as Kesari dhal",
        "Chinese crackers with dangerous explosive compositions",
        "Sword-sticks designed as cutting or stabbing instruments",
      ],
    },
    {
      category: "Medicinal Products",
      description: "Medicines for venereal disease (unless properly licensed)",
      items: [
        "Medicines or medicaments for prevention, cure or relief of venereal disease (to unregistered practitioners)",
        "Advertisements recommending such medicines",
        "Labels and containers designed for such medicines",
        "Boxes or containers with words or marks indicating medicine for venereal diseases",
      ],
    },
    {
      category: "Legal Prohibitions",
      description: "Articles prohibited by law or government order",
      items: [
        "Any article exportation of which is prohibited by enactment or legal order",
        "Any article importation of which is prohibited by enactment or legal order",
        "Items subject to restriction require special permits and compliance with relevant regulations",
      ],
    },
  ];
}
