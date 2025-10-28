import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HeaderComponent } from "../components/header";
import {
  commodityCodes,
  searchCommodities,
  CommodityCode,
} from "../data/tariff-database";

@Component({
  selector: "app-search-tariff",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, HeaderComponent],
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
            Search Tariff
          </h1>
          <p class="text-gray-600">
            Find HS codes, duties, and requirements for your products
          </p>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-7xl mx-auto px-6 py-12">
        <!-- Search Box -->
        <div class="bg-white rounded-lg p-8 shadow-gov mb-8">
          <h2 class="text-2xl font-bold text-gov-dark mb-6">
            Search by HS Code or Product
          </h2>
          <div class="flex gap-4 items-center">
            <input
              type="text"
              [(ngModel)]="searchQuery"
              (input)="onSearchInput()"
              placeholder="Enter HS code (e.g., 0102.21) or product name (e.g., live cattle)..."
              class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-light text-lg"
            />
            <button
              (click)="onSearchInput()"
              class="bg-gov-primary hover:bg-gov-dark text-white px-8 py-3 rounded-lg font-bold transition"
            >
              Search
            </button>
            <label class="flex items-center gap-2 text-sm ml-4">
              <input type="checkbox" [(ngModel)]="includeNz" (change)="onSearchInput()" />
              <span>Include NZ tariff sample</span>
            </label>
          </div>
        </div>

        <!-- Results -->
        <div *ngIf="searchQuery && searchResults.length > 0" class="space-y-4">
          <h3 class="text-2xl font-bold text-gov-dark mb-6">
            {{ searchResults.length }} result<span
              *ngIf="searchResults.length !== 1"
              >s</span
            >
            found
          </h3>

          <div
            *ngFor="let item of searchResults"
            class="bg-white rounded-lg shadow-gov hover:shadow-gov-lg transition"
          >
            <div class="p-6 border-l-4 border-gov-accent">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-gov-dark mb-2">
                    {{ item.description }}
                  </h3>
                  <div class="flex flex-wrap gap-4 mb-4">
                    <div>
                      <span class="text-xs font-bold text-gray-600"
                        >HS CODE</span
                      >
                      <p class="font-mono font-bold text-gov-primary text-lg">
                        {{ item.hsCode }}
                      </p>
                    </div>
                    <div>
                      <span class="text-xs font-bold text-gray-600">UNIT</span>
                      <p class="font-bold text-gov-dark">
                        {{ item.unit || "N/A" }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <span
                    [ngClass]="{
                      'bg-red-100 text-red-800':
                        item.regulatoryStatus === 'prohibited',
                      'bg-yellow-100 text-yellow-800':
                        item.regulatoryStatus === 'restricted',
                      'bg-green-100 text-green-800':
                        item.regulatoryStatus === 'free',
                    }"
                    class="px-4 py-2 rounded-lg font-bold text-sm inline-block"
                  >
                    {{
                      item.regulatoryStatus === "prohibited"
                        ? "PROHIBITED"
                        : item.regulatoryStatus === "restricted"
                          ? "RESTRICTED"
                          : "FREE"
                    }}
                  </span>
                </div>
              </div>

              <!-- Rates Table -->
              <div class="overflow-x-auto mb-4 pt-4 border-t border-gray-200">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="bg-gov-bg">
                      <th class="text-left py-2 px-2 font-bold text-gov-dark">
                        Gen Duty
                      </th>
                      <th class="text-left py-2 px-2 font-bold text-gov-dark">
                        VAT
                      </th>
                      <th class="text-left py-2 px-2 font-bold text-gov-dark">
                        PAL Gen
                      </th>
                      <th class="text-left py-2 px-2 font-bold text-gov-dark">
                        Cess
                      </th>
                      <th class="text-left py-2 px-2 font-bold text-gov-dark">
                        SSCL
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b border-gray-200">
                      <td class="py-2 px-2 font-mono">
                        {{ item.rates.gen || "-" }}
                      </td>
                      <td class="py-2 px-2 font-mono">
                        {{ item.rates.vat || "-" }}
                      </td>
                      <td class="py-2 px-2 font-mono">
                        {{ item.rates.palGen || "-" }}
                      </td>
                      <td class="py-2 px-2 font-mono">
                        {{ item.rates.cess || "-" }}
                      </td>
                      <td class="py-2 px-2 font-mono">
                        {{ item.rates.sscl || "-" }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Notes -->
              <div
                *ngIf="item.notes"
                class="bg-blue-50 border border-blue-200 rounded p-3 mb-4"
              >
                <p class="text-sm text-blue-900">
                  <strong>Note:</strong> {{ item.notes }}
                </p>
              </div>

              <!-- Action Button -->
              <button
                routerLink="/commodity/{{ item.hsCode }}"
                class="text-gov-primary hover:text-gov-dark font-bold text-sm transition"
              >
                View Full Details →
              </button>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div
          *ngIf="searchQuery && searchResults.length === 0 && hasSearched"
          class="bg-amber-50 border border-amber-200 rounded-lg p-8 text-center"
        >
          <svg
            class="w-12 h-12 text-amber-600 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 class="text-lg font-bold text-amber-900 mb-2">
            No Results Found
          </h3>
          <p class="text-amber-800 mb-4">
            No commodities match "{{ searchQuery }}". Try searching with a
            different term or HS code.
          </p>
          <a
            routerLink="/browse-chapters"
            class="text-gov-primary hover:text-gov-dark font-bold"
          >
            Browse All Chapters →
          </a>
        </div>

        <!-- Empty State -->
        <div *ngIf="!searchQuery" class="bg-gov-bg rounded-lg p-12 text-center">
          <svg
            class="w-16 h-16 text-gray-400 mx-auto mb-4"
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
          <h3 class="text-xl font-bold text-gov-dark mb-2">Start Searching</h3>
          <p class="text-gray-600 mb-6">
            Enter an HS code or product name to find tariff information, duties,
            and requirements.
          </p>
          <div class="space-y-2 text-sm">
            <p class="text-gray-600">Example searches:</p>
            <ul class="text-gov-primary space-y-1">
              <li>0102.21 (live cattle)</li>
              <li>live animals</li>
              <li>cattle</li>
            </ul>
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
export class SearchTariffPage {
  searchQuery = "";
  searchResults: CommodityCode[] = [];
  hasSearched = false;

  onSearchInput(): void {
    this.hasSearched = true;
    if (this.searchQuery.trim()) {
      this.searchResults = searchCommodities(this.searchQuery);
    } else {
      this.searchResults = [];
    }
  }
}
