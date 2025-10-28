import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { HeaderComponent } from "../components/header";
import { HeroBannerComponent } from "../components/hero-banner";
import { SearchBarComponent } from "../components/search-bar";

interface AccordionItem {
  title: string;
  icon: string;
  items: { label: string; href: string; description: string }[];
}

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    HeroBannerComponent,
    SearchBarComponent,
  ],
  template: `
    <app-header></app-header>

    <!-- Hero Banner -->
    <app-hero-banner></app-hero-banner>

    <!-- Main Content -->
    <main class="bg-gov-bg">
      <!-- Quick Actions -->
      <div class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-6 py-12">
          <h2 class="text-2xl font-serif font-bold text-gov-dark mb-8">
            Quick Actions
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <a
              routerLink="/search-tariff"
              class="p-6 bg-gov-dark text-white rounded-lg hover:shadow-lg transition hover:bg-gov-primary"
            >
              <svg
                class="w-8 h-8 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 class="font-bold mb-2">Search HS Code</h3>
              <p class="text-sm text-gray-300">
                Find duties, rates, and requirements by HS Code
              </p>
            </a>

            <a
              routerLink="/vehicle-cost-calculator"
              class="p-6 bg-gov-accent text-white rounded-lg hover:shadow-lg transition hover:opacity-90"
            >
              <svg
                class="w-8 h-8 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-2.21 0-4 1.343-4 3 0 1.4 1.278 2.575 3.006 2.907.542.104.994.54.994 1.093v1h2v-1c0-1.1-.9-2-2-2 2.21 0 4-1.343 4-3s-1.79-3-4-3z" />
              </svg>
              <h3 class="font-bold mb-2">Vehicle Cost & Tax Calculator</h3>
              <p class="text-sm text-gray-200">
                Estimate import duties, VAT, levies and total landed cost
              </p>
            </a>

            <a
              routerLink="/browse-chapters"
              class="p-6 bg-gov-primary text-white rounded-lg hover:shadow-lg transition hover:bg-gov-dark"
            >
              <svg
                class="w-8 h-8 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <h3 class="font-bold mb-2">Browse Chapters</h3>
              <p class="text-sm text-gray-300">
                Navigate tariff sections and chapters
              </p>
            </a>

            <a
              routerLink="/how-to-import"
              class="p-6 bg-gov-light text-white rounded-lg hover:shadow-lg transition hover:opacity-90"
            >
              <svg
                class="w-8 h-8 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 class="font-bold mb-2">How to Import</h3>
              <p class="text-sm text-gray-300">
                Guide to importing goods into Sri Lanka
              </p>
            </a>

            <a
              routerLink="/help"
              class="p-6 bg-gov-accent text-white rounded-lg hover:shadow-lg transition hover:opacity-90"
            >
              <svg
                class="w-8 h-8 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 class="font-bold mb-2">Help & FAQ</h3>
              <p class="text-sm text-gray-300">Answers to common questions</p>
            </a>
          </div>
        </div>
      </div>

      <!-- Search Section -->
      <div class="bg-white border-b border-gray-200 py-12">
        <div class="max-w-3xl mx-auto px-6">
          <h2
            class="text-2xl font-serif font-bold text-gov-dark mb-8 text-center"
          >
            Search Product or HS Code
          </h2>
          <app-search-bar></app-search-bar>
        </div>
      </div>

      <!-- Browse Sections (Accordions) -->
      <div class="bg-white py-12">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="text-2xl font-serif font-bold text-gov-dark mb-8">
            Browse by Category
          </h2>

          <div class="space-y-4">
            <!-- Import for Personal Use -->
            <div class="border border-gray-200 rounded-lg">
              <button
                (click)="toggleAccordion('personal')"
                class="w-full px-6 py-4 text-left font-bold text-gov-dark hover:bg-gov-bg transition flex justify-between items-center"
              >
                <span class="text-lg">Importing for Personal Use</span>
                <svg
                  [class.rotate-180]="expandedAccordion() === 'personal'"
                  class="w-5 h-5 transition-transform"
                >
                  <use href="#icon-chevron-down" />
                </svg>
              </button>
              <div
                *ngIf="expandedAccordion() === 'personal'"
                class="px-6 py-6 border-t border-gray-200 bg-gov-bg"
              >
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <a
                    routerLink="/prohibited-items"
                    class="group hover:opacity-75 transition"
                  >
                    <h4
                      class="font-bold text-gov-dark group-hover:text-gov-light transition"
                    >
                      Prohibited Items
                    </h4>
                    <p class="text-sm text-gray-600 mt-2">
                      See what you cannot import under Sri Lankan law
                    </p>
                  </a>
                  <a
                    routerLink="/personal-allowances"
                    class="group hover:opacity-75 transition"
                  >
                    <h4
                      class="font-bold text-gov-dark group-hover:text-gov-light transition"
                    >
                      Personal Allowances
                    </h4>
                    <p class="text-sm text-gray-600 mt-2">
                      Import limits and duty-free thresholds (de-minimis)
                    </p>
                  </a>
                </div>
              </div>
            </div>

            <!-- Business Import/Export -->
            <div class="border border-gray-200 rounded-lg">
              <button
                (click)="toggleAccordion('business')"
                class="w-full px-6 py-4 text-left font-bold text-gov-dark hover:bg-gov-bg transition flex justify-between items-center"
              >
                <span class="text-lg">Business Import/Export</span>
                <svg
                  [class.rotate-180]="expandedAccordion() === 'business'"
                  class="w-5 h-5 transition-transform"
                >
                  <use href="#icon-chevron-down" />
                </svg>
              </button>
              <div
                *ngIf="expandedAccordion() === 'business'"
                class="px-6 py-6 border-t border-gray-200 bg-gov-bg"
              >
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <a
                    routerLink="/browse-chapters"
                    class="group hover:opacity-75 transition"
                  >
                    <h4
                      class="font-bold text-gov-dark group-hover:text-gov-light transition"
                    >
                      Tariff Schedules
                    </h4>
                    <p class="text-sm text-gray-600 mt-2">
                      Complete tariff classifications and duty rates by HS Code
                    </p>
                  </a>
                  <a
                    routerLink="/help"
                    class="group hover:opacity-75 transition"
                  >
                    <h4
                      class="font-bold text-gov-dark group-hover:text-gov-light transition"
                    >
                      Permits & Approvals
                    </h4>
                    <p class="text-sm text-gray-600 mt-2">
                      Required government approvals by product type
                    </p>
                  </a>
                  <a
                    routerLink="/how-to-import"
                    class="group hover:opacity-75 transition"
                  >
                    <h4
                      class="font-bold text-gov-dark group-hover:text-gov-light transition"
                    >
                      Customs Procedures
                    </h4>
                    <p class="text-sm text-gray-600 mt-2">
                      Documentation and declaration requirements
                    </p>
                  </a>
                </div>
              </div>
            </div>

            <!-- Restricted & Prohibited -->
            <div class="border border-gray-200 rounded-lg">
              <button
                (click)="toggleAccordion('restricted')"
                class="w-full px-6 py-4 text-left font-bold text-gov-dark hover:bg-gov-bg transition flex justify-between items-center"
              >
                <span class="text-lg">Restrictions & Prohibitions</span>
                <svg
                  [class.rotate-180]="expandedAccordion() === 'restricted'"
                  class="w-5 h-5 transition-transform"
                >
                  <use href="#icon-chevron-down" />
                </svg>
              </button>
              <div
                *ngIf="expandedAccordion() === 'restricted'"
                class="px-6 py-6 border-t border-gray-200 bg-gov-bg"
              >
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <a
                    routerLink="/prohibited-items"
                    class="group hover:opacity-75 transition"
                  >
                    <h4
                      class="font-bold text-gov-dark group-hover:text-gov-light transition"
                    >
                      Completely Prohibited
                    </h4>
                    <p class="text-sm text-gray-600 mt-2">
                      Items banned from import/export under all circumstances
                    </p>
                  </a>
                  <a
                    routerLink="/personal-allowances"
                    class="group hover:opacity-75 transition"
                  >
                    <h4
                      class="font-bold text-gov-dark group-hover:text-gov-light transition"
                    >
                      Restricted Items
                    </h4>
                    <p class="text-sm text-gray-600 mt-2">
                      Items requiring permits, licenses, and special approvals
                    </p>
                  </a>
                  <a
                    routerLink="/help"
                    class="group hover:opacity-75 transition"
                  >
                    <h4
                      class="font-bold text-gov-dark group-hover:text-gov-light transition"
                    >
                      CITES Regulations
                    </h4>
                    <p class="text-sm text-gray-600 mt-2">
                      Wildlife and endangered species import restrictions
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Key Information Section -->
      <div class="bg-gov-bg border-b border-gray-200 py-12">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="text-2xl font-serif font-bold text-gov-dark mb-8">
            Key Information
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white p-8 rounded-lg border-l-4 border-gov-accent">
              <h3 class="text-lg font-bold text-gov-dark mb-4">
                What This Portal Does
              </h3>
              <ul class="space-y-3 text-gray-700">
                <li class="flex items-start gap-3">
                  <svg
                    class="w-5 h-5 text-gov-light flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span
                    >Provides regulatory guidance on import/export
                    requirements</span
                  >
                </li>
                <li class="flex items-start gap-3">
                  <svg
                    class="w-5 h-5 text-gov-light flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span
                    >Shows complete tariff classifications and duty rates</span
                  >
                </li>
                <li class="flex items-start gap-3">
                  <svg
                    class="w-5 h-5 text-gov-light flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Lists required permits and government approvals</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg
                    class="w-5 h-5 text-gov-light flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Calculates estimated duties and taxes</span>
                </li>
              </ul>
            </div>

            <div class="bg-white p-8 rounded-lg border-l-4 border-gov-light">
              <h3 class="text-lg font-bold text-gov-dark mb-4">
                Important Notes
              </h3>
              <ul class="space-y-3 text-gray-700 text-sm">
                <li>
                  <strong>Guidance Only:</strong> This information is for
                  reference. For binding rulings, contact Customs ICT
                  Directorate.
                </li>
                <li>
                  <strong>No Registration Required:</strong> This is a free
                  public tool. No login needed.
                </li>
                <li>
                  <strong>Current Information:</strong> Data reflects
                  regulations as of 2025. Check for updates regularly.
                </li>
                <li>
                  <strong>Contact Customs:</strong> For specific cases, contact
                  the appropriate government agencies.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-gov-dark text-white py-12">
        <div class="max-w-7xl mx-auto px-6 text-center">
          <h2 class="text-3xl font-serif font-bold mb-4">
            Need Official Assistance?
          </h2>
          <p class="text-gray-200 mb-8 max-w-2xl mx-auto">
            Contact the Customs ICT Directorate for binding classifications,
            formal rulings, or specific guidance on your shipment.
          </p>
          <button
            class="bg-gov-accent hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Contact Customs ICT Directorate
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gov-dark text-white border-t-4 border-gov-accent">
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 class="font-bold text-lg mb-4">About SLC</h4>
            <ul class="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" class="hover:text-white transition"
                  >Official Website</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-white transition"
                  >Mission & Vision</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-white transition"
                  >News & Updates</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-lg mb-4">Resources</h4>
            <ul class="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" class="hover:text-white transition"
                  >Tariff Database</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-white transition"
                  >Regulations & Acts</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-white transition"
                  >Forms & Documents</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-lg mb-4">Support</h4>
            <ul class="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" class="hover:text-white transition">Help & FAQ</a>
              </li>
              <li>
                <a href="#" class="hover:text-white transition">Contact Us</a>
              </li>
              <li>
                <a href="#" class="hover:text-white transition">Feedback</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-lg mb-4">Legal</h4>
            <ul class="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" class="hover:text-white transition"
                  >Privacy Policy</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-white transition">Terms of Use</a>
              </li>
              <li>
                <a href="#" class="hover:text-white transition"
                  >Accessibility</a
                >
              </li>
            </ul>
          </div>
        </div>

        <div
          class="border-t border-gray-600 pt-8 text-center text-sm text-gray-300"
        >
          <p>© 2025 Sri Lanka Customs. Trade Regulatory Guidance Portal.</p>
          <p class="mt-2">Maintained by the Customs ICT Directorate</p>
        </div>
      </div>
    </footer>

    <!-- SVG Icons -->
    <svg style="display: none;">
      <symbol
        id="icon-chevron-down"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </symbol>
    </svg>
  `,
})
export class HomePage {
  expandedAccordion = signal<string | null>(null);

  toggleAccordion(section: string): void {
    this.expandedAccordion.set(
      this.expandedAccordion() === section ? null : section,
    );
  }
}
