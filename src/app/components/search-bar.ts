import { Component, Output, EventEmitter, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { commodityCodes, CommodityCode } from "../data/tariff-database";

@Component({
  selector: "app-search-bar",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative w-full max-w-3xl mx-auto">
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
        >
          <svg
            class="w-5 h-5 text-gov-dark"
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
        </div>
        <input
          type="text"
          [(ngModel)]="searchQuery"
          (input)="onSearchInput()"
          (focus)="showDropdown = true"
          (blur)="onInputBlur()"
          placeholder="Search HS Code or Product (e.g., 0102.21 or live cattle)"
          class="w-full pl-12 pr-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gov-primary focus:ring-2 focus:ring-gov-light/30 transition"
        />
      </div>

      <!-- Predictive Dropdown -->
      <div
        *ngIf="showDropdown && filteredSuggestions().length > 0"
        class="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-gov-lg border border-gray-200 z-50 overflow-hidden"
      >
        <div class="max-h-96 overflow-y-auto">
          <div
            *ngFor="let item of filteredSuggestions()"
            (click)="selectItem(item)"
            class="px-4 py-3 hover:bg-gov-bg cursor-pointer border-b border-gray-100 last:border-b-0 transition"
          >
            <div class="flex justify-between items-start gap-4">
              <div class="flex-1">
                <div class="font-semibold text-gov-dark">
                  {{ item.description }}
                </div>
                <div class="text-xs text-gray-600 mt-1">
                  HS Code: {{ item.hsCode }}
                </div>
              </div>
              <div class="text-right flex-shrink-0">
                <div
                  [ngClass]="{
                    'bg-red-100 text-red-800':
                      item.regulatoryStatus === 'prohibited',
                    'bg-yellow-100 text-yellow-800':
                      item.regulatoryStatus === 'restricted',
                    'bg-green-100 text-green-800':
                      item.regulatoryStatus === 'free',
                  }"
                  class="text-xs font-semibold px-2 py-1 rounded inline-block"
                >
                  {{
                    item.regulatoryStatus === "prohibited"
                      ? "PROHIBITED"
                      : item.regulatoryStatus === "restricted"
                        ? "RESTRICTED"
                        : "FREE"
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results Message -->
      <div
        *ngIf="
          showDropdown && searchQuery && filteredSuggestions().length === 0
        "
        class="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-gov-lg border border-gray-200 z-50 p-4 text-center text-gray-500"
      >
        No results found for "{{ searchQuery }}"
      </div>
    </div>
  `,
})
export class SearchBarComponent {
  @Output() itemSelected = new EventEmitter<CommodityCode>();

  searchQuery = "";
  showDropdown = false;
  filteredSuggestions = signal<CommodityCode[]>([]);

  constructor(private router: Router) {}

  onSearchInput(): void {
    const query = this.searchQuery.toLowerCase();
    if (query.length === 0) {
      this.filteredSuggestions.set([]);
      return;
    }

    const filtered = commodityCodes
      .filter(
        (item: CommodityCode) =>
          item.description.toLowerCase().includes(query) ||
          item.hsCode.includes(query),
      )
      .slice(0, 10);

    this.filteredSuggestions.set(filtered);
  }

  selectItem(item: CommodityCode): void {
    this.itemSelected.emit(item);
    this.router.navigate(["/search-tariff"], {
      queryParams: {
        q: item.hsCode,
      },
    });
    this.showDropdown = false;
  }

  onInputBlur(): void {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }
}
