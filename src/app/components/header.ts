import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Alert Banner -->
    <div class="bg-amber-50 border-b border-amber-200">
      <div class="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3">
        <svg
          class="w-5 h-5 text-amber-600 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="text-sm text-amber-800">
          <strong>Disclaimer:</strong> This portal provides guidance only. For
          binding rulings, contact the Customs ICT Directorate.
        </p>
      </div>
    </div>

    <!-- Main Header -->
    <header class="bg-gov-dark shadow-lg border-b-4 border-gov-accent">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Top Bar with Logo and Search -->
        <div class="py-4 flex items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center gap-4 flex-1">
            <div class="bg-white rounded-lg p-2 shadow-md">
              <svg
                class="w-8 h-8 text-gov-dark"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                />
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-white">Sri Lanka Customs</h1>
              <p class="text-xs text-gray-300">
                Trade Regulatory Guidance Portal
              </p>
            </div>
          </div>

          <!-- Search and Contact -->
          <div class="flex items-center gap-4">
            <input
              type="search"
              placeholder="Search HS Code or product..."
              class="px-4 py-2 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gov-light hidden md:block w-64"
            />
            <a
              routerLink="/contact"
              class="bg-gov-accent hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              Contact
            </a>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <nav class="border-t border-gray-600 flex items-center">
          <a
            routerLink="/"
            class="px-6 py-3 text-white hover:bg-gov-primary transition text-sm font-medium border-b-2 border-transparent hover:border-gov-light"
          >
            Home
          </a>
          <button
            (click)="toggleNavMenu('search')"
            class="px-6 py-3 text-white hover:bg-gov-primary transition text-sm font-medium border-b-2 border-transparent hover:border-gov-light"
          >
            Search Tariffs
          </button>
          <button
            (click)="toggleNavMenu('browse')"
            class="px-6 py-3 text-white hover:bg-gov-primary transition text-sm font-medium border-b-2 border-transparent hover:border-gov-light"
          >
            Browse by Chapter
          </button>
          <a
            routerLink="/how-to-import"
            class="px-6 py-3 text-white hover:bg-gov-primary transition text-sm font-medium border-b-2 border-transparent hover:border-gov-light"
          >
            How to Import
          </a>
          <a
            routerLink="/help"
            class="px-6 py-3 text-white hover:bg-gov-primary transition text-sm font-medium border-b-2 border-transparent hover:border-gov-light"
          >
            Help & FAQ
          </a>
        </nav>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  navMenuOpen = signal<string | null>(null);

  toggleNavMenu(menu: string): void {
    this.navMenuOpen.set(this.navMenuOpen() === menu ? null : menu);
  }
}
