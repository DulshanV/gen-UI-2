import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { HeaderComponent } from "../components/header";
import {
  chapters,
  commodityCodes,
  CommodityCode,
} from "../data/tariff-database";

@Component({
  selector: "app-browse-chapters",
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
            Browse Tariff Chapters
          </h1>
          <p class="text-gray-600">
            Sri Lanka Customs National Imports Tariff Guide - 2025
          </p>
        </div>
      </div>

      <!-- Chapters Grid -->
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            *ngFor="let chapter of chapters"
            class="bg-white rounded-lg shadow-gov hover:shadow-gov-lg transition border-l-4 border-gov-accent"
          >
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h3 class="text-2xl font-bold text-gov-dark">
                    Chapter {{ chapter.number }}
                  </h3>
                  <p class="text-sm text-gray-500 mt-1">
                    {{ chapter.section }}
                  </p>
                </div>
                <div
                  class="bg-gov-light text-white px-3 py-1 rounded text-xs font-bold"
                >
                  {{ getChapterCount(chapter.number) }} items
                </div>
              </div>
              <h4 class="text-lg font-bold text-gov-dark mb-3">
                {{ chapter.title }}
              </h4>
              <p
                *ngIf="chapter.note"
                class="text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200"
              >
                {{ chapter.note }}
              </p>
              <button
                (click)="expandChapter(chapter.number)"
                class="text-gov-primary hover:text-gov-dark font-medium text-sm transition"
              >
                View All Commodities →
              </button>
            </div>

            <!-- Expanded Commodities -->
            <div
              *ngIf="expandedChapter === chapter.number"
              class="border-t border-gray-200 bg-gov-bg p-6"
            >
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="border-b-2 border-gov-dark">
                      <th class="text-left py-2 px-2 font-bold text-gov-dark">
                        HS Code
                      </th>
                      <th class="text-left py-2 px-2 font-bold text-gov-dark">
                        Description
                      </th>
                      <th class="text-left py-2 px-2 font-bold text-gov-dark">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      *ngFor="
                        let commodity of getChapterCommodities(chapter.number)
                      "
                      class="border-b border-gray-300 hover:bg-white transition"
                    >
                      <td class="py-3 px-2">
                        <span class="font-mono font-bold text-gov-primary">{{
                          commodity.hsCode
                        }}</span>
                      </td>
                      <td class="py-3 px-2 text-gray-700">
                        {{ commodity.description }}
                      </td>
                      <td class="py-3 px-2">
                        <span
                          [ngClass]="{
                            'bg-red-100 text-red-800':
                              commodity.regulatoryStatus === 'prohibited',
                            'bg-yellow-100 text-yellow-800':
                              commodity.regulatoryStatus === 'restricted',
                            'bg-green-100 text-green-800':
                              commodity.regulatoryStatus === 'free',
                          }"
                          class="px-2 py-1 rounded text-xs font-semibold inline-block"
                        >
                          {{
                            commodity.regulatoryStatus === "prohibited"
                              ? "PROHIBITED"
                              : commodity.regulatoryStatus === "restricted"
                                ? "RESTRICTED"
                                : "FREE"
                          }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Information Box -->
      <div
        class="bg-amber-50 border border-amber-200 mx-6 my-12 rounded-lg p-6 max-w-7xl mx-auto"
      >
        <h3 class="font-bold text-amber-900 mb-2">About Tariff Chapters</h3>
        <p class="text-sm text-amber-800">
          The Harmonized Commodity Description and Coding System (HS Code)
          classifies all internationally traded products. Sri Lanka uses this
          system to determine duties, taxes, and regulatory requirements. Click
          on any chapter to see all commodities in that section.
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
export class BrowseChaptersPage implements OnInit {
  chapters = chapters;
  expandedChapter: number | null = null;

  ngOnInit(): void {
    // Expand first chapter by default
    if (this.chapters.length > 0) {
      this.expandedChapter = this.chapters[0].number;
    }
  }

  expandChapter(chapterNumber: number): void {
    this.expandedChapter =
      this.expandedChapter === chapterNumber ? null : chapterNumber;
  }

  getChapterCount(chapterNumber: number): number {
    return commodityCodes.filter((c) => c.chapter === chapterNumber).length;
  }

  getChapterCommodities(chapterNumber: number): CommodityCode[] {
    return commodityCodes.filter((c) => c.chapter === chapterNumber);
  }
}
