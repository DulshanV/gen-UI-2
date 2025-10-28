import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { HeaderComponent } from "../components/header";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

@Component({
  selector: "app-help",
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
            Help & FAQ
          </h1>
          <p class="text-gray-600">
            Frequently asked questions about Sri Lanka Customs tariffs and
            import procedures
          </p>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Category Filter -->
            <div class="flex flex-wrap gap-2 mb-8">
              <button
                *ngFor="let category of categories"
                (click)="selectedCategory.set(category)"
                [ngClass]="{
                  'bg-gov-dark text-white': selectedCategory() === category,
                  'bg-white text-gov-dark border border-gray-300':
                    selectedCategory() !== category,
                }"
                class="px-4 py-2 rounded-lg font-medium text-sm transition hover:bg-gov-dark hover:text-white"
              >
                {{ category }}
              </button>
            </div>

            <!-- FAQ Items -->
            <div class="space-y-4">
              <div
                *ngFor="let item of filteredFaqs()"
                class="bg-white rounded-lg shadow-gov border-l-4 border-gov-accent"
              >
                <button
                  (click)="toggleFaq(item.question)"
                  class="w-full px-6 py-4 text-left font-bold text-gov-dark hover:bg-gov-bg transition flex justify-between items-center"
                >
                  <span>{{ item.question }}</span>
                  <svg
                    [class.rotate-180]="expandedFaq() === item.question"
                    class="w-5 h-5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
                <div
                  *ngIf="expandedFaq() === item.question"
                  class="px-6 py-4 border-t border-gray-200 bg-gov-bg"
                >
                  <p class="text-gray-700">{{ item.answer }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Search Box -->
            <div class="bg-white rounded-lg p-6 shadow-gov">
              <h4 class="font-bold text-gov-dark mb-4">Quick Search</h4>
              <input
                type="search"
                placeholder="Search FAQ..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gov-light"
              />
            </div>

            <!-- Getting Started -->
            <div class="bg-gov-light text-white rounded-lg p-6">
              <h4 class="font-bold mb-4">Getting Started</h4>
              <ol class="space-y-3 text-sm">
                <li class="flex items-start gap-3">
                  <span class="font-bold flex-shrink-0">1.</span>
                  <span>Find your product's HS Code</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="font-bold flex-shrink-0">2.</span>
                  <span>Check regulatory status</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="font-bold flex-shrink-0">3.</span>
                  <span>Calculate duties & taxes</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="font-bold flex-shrink-0">4.</span>
                  <span>Obtain required permits</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="font-bold flex-shrink-0">5.</span>
                  <span>Submit customs declaration</span>
                </li>
              </ol>
            </div>

            <!-- Contact Support -->
            <div class="bg-gov-dark text-white rounded-lg p-6">
              <h4 class="font-bold mb-4">Still Need Help?</h4>
              <p class="text-sm text-gray-300 mb-4">
                Contact the Customs ICT Directorate for detailed assistance with
                your specific situation.
              </p>
              <button
                class="bg-gov-accent hover:bg-yellow-600 text-white w-full py-2 rounded font-semibold text-sm transition"
              >
                Contact Support
              </button>
            </div>

            <!-- Links -->
            <div class="bg-white rounded-lg p-6 shadow-gov">
              <h4 class="font-bold text-gov-dark mb-4">Useful Links</h4>
              <ul class="space-y-2 text-sm">
                <li>
                  <a
                    routerLink="/how-to-import"
                    class="text-gov-primary hover:text-gov-dark"
                    >How to Import</a
                  >
                </li>
                <li>
                  <a
                    routerLink="/browse-chapters"
                    class="text-gov-primary hover:text-gov-dark"
                    >Browse Chapters</a
                  >
                </li>
                <li>
                  <a href="#" class="text-gov-primary hover:text-gov-dark"
                    >Tariff Book (PDF)</a
                  >
                </li>
                <li>
                  <a href="#" class="text-gov-primary hover:text-gov-dark"
                    >Contact Customs</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
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
export class HelpPage {
  selectedCategory = signal("All");
  expandedFaq = signal<string | null>(null);

  categories = [
    "All",
    "General",
    "HS Code",
    "Duties & Taxes",
    "Permits",
    "Procedures",
  ];

  faqs: FaqItem[] = [
    {
      question: "What is an HS Code?",
      answer:
        "An HS Code (Harmonized System Code) is a 6-8 digit number that classifies all internationally traded products. Sri Lanka uses 8-digit HS codes to determine duties, taxes, and regulatory requirements for each commodity.",
      category: "HS Code",
    },
    {
      question: "How do I find the correct HS Code for my product?",
      answer:
        "You can search by product name or description using the search bar on the home page. You can also browse by tariff chapter if you know the general category of your product. If you're unsure, contact the Customs Classification Unit.",
      category: "HS Code",
    },
    {
      question: "What duties and taxes will I pay?",
      answer:
        "The duties and taxes depend on your product's HS Code and include: Customs Duty (varies by product), VAT (18%), Excise/PAL, Cess, and SSCL. Use the duty calculator in this portal to estimate your total landed cost.",
      category: "Duties & Taxes",
    },
    {
      question: "Are there any prohibited items?",
      answer:
        "Yes, some items are completely prohibited from import, including illegal narcotics, certain weapons, protected wildlife, and counterfeit goods. Check the regulatory status before importing.",
      category: "General",
    },
    {
      question: "What permits do I need?",
      answer:
        "Different products require different permits: CITES for wildlife, NMRA license for pharmaceuticals, SLSI approval for standards, Ministry approval for livestock, etc. Check your product's regulatory status in this portal.",
      category: "Permits",
    },
    {
      question: "How do I submit a customs declaration?",
      answer:
        "You can submit a customs declaration through the appropriate port of entry (seaport, airport, or land border). You may use a Customs House Agent (CHA) to assist with the process. Declarations are typically submitted electronically.",
      category: "Procedures",
    },
    {
      question: "Is this portal information legally binding?",
      answer:
        "No, this portal provides guidance only. For binding official classifications and rulings on your specific goods, you must contact the Customs ICT Directorate directly.",
      category: "General",
    },
    {
      question: "Do I need to register to use this portal?",
      answer:
        "No, this is a free public resource accessible to all traders and importers without registration or login.",
      category: "General",
    },
  ];

  toggleFaq(question: string): void {
    this.expandedFaq.set(this.expandedFaq() === question ? null : question);
  }

  filteredFaqs() {
    const category = this.selectedCategory();
    if (category === "All") {
      return this.faqs;
    }
    return this.faqs.filter((item) => item.category === category);
  }
}
