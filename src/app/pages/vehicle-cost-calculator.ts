import { Component, computed, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { HeaderComponent } from "../components/header";
import { CalculatorFormComponent } from "../components/calculator-form/calculator-form.component";
import { CalculatorResultsComponent } from "../components/calculator-results/calculator-results.component";
import { ContentAdapterService } from "../services/content-adapter.service";
import {
  CalculationResult,
  CalculatorConfig,
  VehicleCalculatorService,
} from "../services/vehicle-calculator.service";

@Component({
  selector: "app-vehicle-cost-calculator",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    CalculatorFormComponent,
    CalculatorResultsComponent,
  ],
  template: `
    <app-header></app-header>

    <main class="min-h-screen bg-gov-bg">
      <!-- Breadcrumb -->
      <div class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <a
            routerLink="/"
            class="text-gov-dark hover:text-gov-primary font-medium text-sm"
            >← Back to Home</a
          >
        </div>
      </div>

      <!-- Hero -->
      <section class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-6 py-10">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 class="text-3xl font-serif font-bold text-gov-dark mb-3">
                {{ content().hero.title.value }}
              </h1>
              <p class="text-gray-700 mb-4">
                {{ content().hero.subtitle.value }}
              </p>
              <a
                href="#calculator"
                class="bg-gov-accent hover:bg-yellow-600 text-white px-4 py-2 rounded font-semibold"
                >Start Now</a
              >
            </div>
            <div *ngIf="content().hero.imageUrl.value" class="hidden md:block">
              <img
                [src]="content().hero.imageUrl.value"
                alt="Illustrative"
                class="w-full rounded-lg shadow-gov"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Intro/Help -->
      <section class="bg-gov-bg">
        <div class="max-w-7xl mx-auto px-6 py-6">
          <div
            class="bg-white rounded-lg p-6 shadow-gov border-l-4"
            [ngClass]="{
              'border-gov-accent': content().intro.review_required,
              'border-gov-light': !content().intro.review_required,
            }"
          >
            <p class="text-sm text-gray-800">
              {{ content().intro.body.value }}
            </p>
          </div>
        </div>
      </section>

      <!-- Calculator -->
      <section id="calculator" class="max-w-7xl mx-auto px-6 py-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Form -->
          <div class="bg-white rounded-lg p-6 shadow-gov">
            <h2 class="text-xl font-bold text-gov-dark mb-4">Enter Details</h2>
            <app-calculator-form
              [labels]="content().form"
              [currencies]="currencies()"
              (calculate)="onCalculate($event)"
            ></app-calculator-form>
          </div>
          <!-- Results -->
          <div class="bg-white rounded-lg p-6 shadow-gov">
            <h2 class="text-xl font-bold text-gov-dark mb-4">Results</h2>
            <app-calculator-results
              [result]="result()"
            ></app-calculator-results>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="bg-white border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-6 py-10">
          <h3 class="text-2xl font-serif font-bold text-gov-dark mb-6">FAQ</h3>
          <div class="space-y-4">
            <details
              *ngFor="let f of content().faq"
              class="bg-gov-bg rounded-lg p-4"
            >
              <summary class="font-semibold cursor-pointer">{{ f.q }}</summary>
              <p class="mt-2 text-gray-700">{{ f.a }}</p>
            </details>
          </div>
        </div>
      </section>

      <!-- Footer CTA -->
      <section class="bg-gov-dark text-white border-t-4 border-gov-accent">
        <div
          class="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div>
            <p class="font-semibold">Need assistance?</p>
            <p class="text-sm text-gray-300">
              Contact the Customs ICT Directorate for binding rulings.
            </p>
          </div>
          <div class="flex gap-3">
            <a
              [href]="content().ctas.contactHref"
              class="bg-gov-accent hover:bg-yellow-600 text-white px-4 py-2 rounded font-semibold"
              >{{ content().ctas.contactText }}</a
            >
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gov-dark text-white border-t-4 border-gov-accent py-8">
        <div class="max-w-7xl mx-auto px-6 text-center">
          <p class="text-sm text-gray-300">© 2025 Sri Lanka Customs</p>
        </div>
      </footer>
    </main>
  `,
})
export class VehicleCostCalculatorPage {
  content = signal(null as any);
  result = signal<CalculationResult | null>(null);
  currencies = computed(() =>
    this.content()?.rates ? ["LKR", "USD", "EUR", "JPY"] : ["LKR"],
  );

  constructor(
    private contentSvc: ContentAdapterService,
    private calc: VehicleCalculatorService,
  ) {
    // Load content safely after services are initialized
    this.content.set(this.contentSvc.load());
  }

  onCalculate(input: any): void {
    try {
      const cfg: CalculatorConfig = {
        rates: {
          generalDutyRate: this.content().rates.generalDutyRate.value,
          vatRate: this.content().rates.vatRate.value,
          palRate: this.content().rates.palRate.value,
          cessRate: this.content().rates.cessRate.value,
          ssclRate: this.content().rates.ssclRate.value,
          exciseRules: this.content().rates.exciseRules.value as any,
        },
        deMinimis: this.content().rates.deMinimis?.value,
      };
      this.result.set(this.calc.calculate(input, cfg));
    } catch (e: any) {
      this.result.set(null);
      alert(e.message);
    }
  }
}
