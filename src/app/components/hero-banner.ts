import { Component } from "@angular/core";

@Component({
  selector: "app-hero-banner",
  standalone: true,
  template: `
    <div
      class="relative bg-gradient-to-r from-gov-dark to-gov-primary overflow-hidden"
    >
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <svg
          class="w-full h-full"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                stroke-width="0.5"
              />
            </pattern>
          </defs>
          <rect width="1200" height="400" fill="url(#grid)" />
        </svg>
      </div>

      <!-- Content -->
      <div class="relative max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
          Trade Regulatory Guidance Portal
        </h1>
        <p class="text-xl text-gray-100 max-w-2xl mx-auto mb-8">
          Sri Lanka Customs' official resource for import/export tariff
          information, duty calculations, and regulatory requirements.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <button
            class="bg-gov-accent hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Search Tariffs Now
          </button>
          <button
            class="bg-white hover:bg-gray-100 text-gov-dark px-8 py-3 rounded-lg font-semibold transition border-2 border-white"
          >
            Browse by Chapter
          </button>
        </div>
      </div>
    </div>
  `,
})
export class HeroBannerComponent {}
