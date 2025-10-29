import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { HeaderComponent } from "../components/header";

@Component({
  selector: "app-how-to-import",
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
            How to Import into Sri Lanka
          </h1>
          <p class="text-gray-600">
            Step-by-step guide for importers and traders
          </p>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Step 1 -->
            <div class="bg-white rounded-lg p-8 border-l-4 border-gov-accent">
              <div class="flex items-start gap-4 mb-4">
                <div
                  class="bg-gov-accent text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                >
                  1
                </div>
                <h3 class="text-2xl font-bold text-gov-dark pt-1">
                  Determine Your HS Code
                </h3>
              </div>
              <p class="text-gray-700 mb-4">
                Every product imported into Sri Lanka must be classified using
                the Harmonized System (HS) Code. This 8-digit code determines
                duties, taxes, and regulatory requirements.
              </p>
              <button
                routerLink="/browse-chapters"
                class="text-gov-primary hover:text-gov-dark font-medium"
              >
                Browse Tariff Chapters →
              </button>
            </div>

            <!-- Step 2 -->
            <div class="bg-white rounded-lg p-8 border-l-4 border-gov-light">
              <div class="flex items-start gap-4 mb-4">
                <div
                  class="bg-gov-light text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                >
                  2
                </div>
                <h3 class="text-2xl font-bold text-gov-dark pt-1">
                  Check Regulations & Permits
                </h3>
              </div>
              <p class="text-gray-700 mb-4">
                Some products are restricted or prohibited, and others require
                special permits from government agencies. Check the regulatory
                status of your product before importing.
              </p>
              <ul class="text-gray-700 space-y-2 ml-4">
                <li>• CITES permits for wildlife/endangered species</li>
                <li>• NMRA license for pharmaceuticals</li>
                <li>• SLSI approval for standards compliance</li>
                <li>• Ministry of Livestock approval for animals</li>
              </ul>
            </div>

            <!-- Step 3 -->
            <div class="bg-white rounded-lg p-8 border-l-4 border-gov-primary">
              <div class="flex items-start gap-4 mb-4">
                <div
                  class="bg-gov-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                >
                  3
                </div>
                <h3 class="text-2xl font-bold text-gov-dark pt-1">
                  Calculate Duties & Taxes
                </h3>
              </div>
              <p class="text-gray-700 mb-4">
                Use the tariff database to find duty rates, VAT, and other
                applicable taxes for your product. Calculate the total landed
                cost including all fees.
              </p>
              <p class="text-sm text-gray-600 italic">
                Standard taxes include: Customs Duty, VAT (18%), Excise Duty
                (PAL), Cess, and SSCL charges.
              </p>
            </div>

            <!-- Step 4 -->
            <div class="bg-white rounded-lg p-8 border-l-4 border-gov-dark">
              <div class="flex items-start gap-4 mb-4">
                <div
                  class="bg-gov-dark text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                >
                  4
                </div>
                <h3 class="text-2xl font-bold text-gov-dark pt-1">
                  Prepare Documentation
                </h3>
              </div>
              <p class="text-gray-700 mb-4">
                Gather all required documents including commercial invoices,
                packing lists, bills of lading, and any permits or
                certifications.
              </p>
              <ul class="text-gray-700 space-y-2 ml-4">
                <li>• Commercial Invoice</li>
                <li>• Packing List</li>
                <li>• Bill of Lading/Airway Bill</li>
                <li>• Required Permits & Certifications</li>
                <li>• Insurance Documents</li>
              </ul>
            </div>

            <!-- Step 5 -->
            <div class="bg-white rounded-lg p-8 border-l-4 border-gov-accent">
              <div class="flex items-start gap-4 mb-4">
                <div
                  class="bg-gov-accent text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                >
                  5
                </div>
                <h3 class="text-2xl font-bold text-gov-dark pt-1">
                  File Customs Declaration
                </h3>
              </div>
              <p class="text-gray-700 mb-4">
                Submit your customs declaration through the appropriate port of
                entry. You may work with a Customs House Agent (CHA) to assist
                with the process.
              </p>
            </div>

            <!-- Step 6 -->
            <div class="bg-white rounded-lg p-8 border-l-4 border-gov-light">
              <div class="flex items-start gap-4 mb-4">
                <div
                  class="bg-gov-light text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                >
                  6
                </div>
                <h3 class="text-2xl font-bold text-gov-dark pt-1">
                  Pay Duties & Clear Customs
                </h3>
              </div>
              <p class="text-gray-700 mb-4">
                Once your declaration is processed and verified, pay the
                assessed duties and taxes. Your goods can then be cleared and
                released.
              </p>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Quick Links -->
            <div class="bg-white rounded-lg p-6 shadow-gov">
              <h4 class="font-bold text-gov-dark mb-4">Quick Links</h4>
              <ul class="space-y-3">
                <li>
                  <a
                    routerLink="/search-tariff"
                    class="text-gov-primary hover:text-gov-dark font-medium text-sm block"
                    >Search HS Code</a
                  >
                </li>
                <li>
                  <a
                    routerLink="/browse-chapters"
                    class="text-gov-primary hover:text-gov-dark font-medium text-sm block"
                    >Browse Chapters</a
                  >
                </li>
                <li>
                  <a
                    routerLink="/search-tariff"
                    class="text-gov-primary hover:text-gov-dark font-medium text-sm block"
                    >Download Tariff Book</a
                  >
                </li>
                <li>
                  <a
                    routerLink="/help"
                    class="text-gov-primary hover:text-gov-dark font-medium text-sm block"
                    >FAQ & Help</a
                  >
                </li>
              </ul>
            </div>

            <!-- Contact Info -->
            <div class="bg-gov-dark text-white rounded-lg p-6">
              <h4 class="font-bold mb-4">Need Help?</h4>
              <p class="text-sm text-gray-300 mb-4">
                Contact the Customs ICT Directorate for specific assistance with
                your import requirements.
              </p>
              <button
                routerLink="/contact"
                class="bg-gov-accent hover:bg-yellow-600 text-white w-full py-2 rounded font-semibold text-sm transition"
              >
                Contact Customs
              </button>
            </div>

            <!-- Information Box -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 class="font-bold text-blue-900 mb-3">Did You Know?</h4>
              <p class="text-sm text-blue-800">
                You can use this portal to check duty rates and regulatory
                status before making your purchase, helping you calculate total
                import costs accurately.
              </p>
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
export class HowToImportPage {}
