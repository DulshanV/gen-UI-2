import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { HeaderComponent } from "../components/header";

interface AllowanceItem {
  category: string;
  limit: string;
  description: string;
  details?: string[];
}

@Component({
  selector: "app-personal-allowances",
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
            Personal Import Allowances
          </h1>
          <p class="text-gray-600">
            De-minimis Concessions and Duty-Free Thresholds for Personal Imports
          </p>
        </div>
      </div>

      <!-- Info Banner -->
      <div
        class="bg-blue-50 border-l-4 border-blue-500 p-6 mx-6 my-8 rounded-lg max-w-7xl mx-auto"
      >
        <h3 class="font-bold text-blue-900 mb-2">
          ℹ️ About Personal Allowances
        </h3>
        <p class="text-sm text-blue-800">
          De-minimis concessions allow you to import small quantities of goods
          without paying customs import duty (CID) and value added tax (VAT)
          below certain thresholds. These apply to courier, parcel post, and
          unaccompanied baggage imports.
        </p>
      </div>

      <!-- Current De-minimis Limits -->
      <div class="max-w-7xl mx-auto px-6 py-12">
        <h2 class="text-2xl font-serif font-bold text-gov-dark mb-8">
          Current De-minimis Thresholds (2025)
        </h2>

        <!-- Personal Items -->
        <div
          class="bg-white rounded-lg shadow-gov border-l-4 border-gov-light p-6 mb-6"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-xl font-bold text-gov-dark">
                Personal Items & Gifts (DMP)
              </h3>
              <p class="text-gray-600 text-sm mt-1">
                Code: DMP - de-minimis Personal
              </p>
            </div>
            <div
              class="bg-green-100 text-green-800 px-4 py-2 rounded font-bold"
            >
              DUTY FREE
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-green-50 border border-green-200 rounded p-4">
              <p class="text-sm font-bold text-green-900 mb-2">
                Customs Import Duty (CID)
              </p>
              <p class="text-2xl font-bold text-green-700">LKR 15,000</p>
              <p class="text-xs text-green-700 mt-2">
                Maximum value for duty exemption
              </p>
            </div>
            <div class="bg-green-50 border border-green-200 rounded p-4">
              <p class="text-sm font-bold text-green-900 mb-2">
                Value Added Tax (VAT)
              </p>
              <p class="text-2xl font-bold text-green-700">LKR 10,000</p>
              <p class="text-xs text-green-700 mt-2">
                Maximum value for VAT exemption
              </p>
            </div>
          </div>

          <div class="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
            <p class="text-sm text-blue-900">
              <strong>Eligible items:</strong> Clothes, books, small gifts,
              personal care items, samples (non-commercial), and similar
              personal goods
            </p>
          </div>
        </div>

        <!-- Business Samples -->
        <div
          class="bg-white rounded-lg shadow-gov border-l-4 border-gov-primary p-6 mb-6"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-xl font-bold text-gov-dark">
                Business Samples & Imports (DMB)
              </h3>
              <p class="text-gray-600 text-sm mt-1">
                Code: DMB - de-minimis Business
              </p>
            </div>
            <div class="bg-blue-100 text-blue-800 px-4 py-2 rounded font-bold">
              LIMITED DUTY FREE
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-blue-50 border border-blue-200 rounded p-4">
              <p class="text-sm font-bold text-blue-900 mb-2">
                Customs Import Duty (CID)
              </p>
              <p class="text-2xl font-bold text-blue-700">LKR 50,000</p>
              <p class="text-xs text-blue-700 mt-2">
                Maximum value for duty exemption
              </p>
            </div>
            <div class="bg-blue-50 border border-blue-200 rounded p-4">
              <p class="text-sm font-bold text-blue-900 mb-2">
                Value Added Tax (VAT)
              </p>
              <p class="text-2xl font-bold text-blue-700">LKR 10,000</p>
              <p class="text-xs text-blue-700 mt-2">
                Maximum value for VAT exemption
              </p>
            </div>
          </div>

          <div class="mt-4 p-4 bg-orange-50 rounded border border-orange-200">
            <p class="text-sm text-orange-900">
              <strong>Eligible items:</strong> Business samples, promotional
              materials, catalogs, trade samples related to business operations
            </p>
          </div>
        </div>

        <!-- Categories -->
        <h2 class="text-2xl font-serif font-bold text-gov-dark my-8">
          Import Categories
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            class="bg-white rounded-lg shadow-gov p-6 border-t-4 border-gov-light"
          >
            <h4 class="text-lg font-bold text-gov-dark mb-4">
              Category I: Eligible for De-minimis
            </h4>
            <ul class="space-y-2 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <span class="text-gov-light font-bold">✓</span>
                <span>Correspondence and documents</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-gov-light font-bold">✓</span>
                <span
                  >Personal items worth under LKR 15,000 (CID) / LKR 10,000
                  (VAT)</span
                >
              </li>
              <li class="flex items-start gap-2">
                <span class="text-gov-light font-bold">✓</span>
                <span
                  >Business samples worth under LKR 50,000 (CID) / LKR 10,000
                  (VAT)</span
                >
              </li>
              <li class="flex items-start gap-2">
                <span class="text-gov-light font-bold">✓</span>
                <span>Trade samples for business purposes</span>
              </li>
            </ul>
          </div>

          <div
            class="bg-white rounded-lg shadow-gov p-6 border-t-4 border-gov-dark"
          >
            <h4 class="text-lg font-bold text-gov-dark mb-4">
              Category II: Standard Duties Apply
            </h4>
            <ul class="space-y-2 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <span class="text-red-600 font-bold">✗</span>
                <span>Dutiable consignments exceeding limits</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-600 font-bold">✗</span>
                <span>Commercial goods and merchandise</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-600 font-bold">✗</span>
                <span>Items requiring government permits</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-600 font-bold">✗</span>
                <span>Restricted or prohibited items</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Baggage Allowance -->
      <div class="bg-white py-12 border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="text-2xl font-serif font-bold text-gov-dark mb-8">
            Passenger Baggage Allowance
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-gov-light text-white p-6 rounded-lg">
              <h4 class="font-bold mb-2 text-lg">Duty-Free Threshold</h4>
              <p class="text-3xl font-bold mb-2">USD 500</p>
              <p class="text-sm opacity-90">
                Or equivalent in local currency for accompanied baggage
              </p>
            </div>
            <div class="bg-gov-primary text-white p-6 rounded-lg">
              <h4 class="font-bold mb-2 text-lg">Duty-Free Items</h4>
              <p class="text-sm opacity-90">
                Personal clothes, toiletries, books, small gifts up to declared
                limit
              </p>
            </div>
            <div class="bg-gov-accent text-white p-6 rounded-lg">
              <h4 class="font-bold mb-2 text-lg">Documentation</h4>
              <p class="text-sm opacity-90">
                Passport required to claim baggage allowance. Declaration form
                needed for items exceeding limits.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Important Notes -->
      <div
        class="bg-amber-50 border border-amber-200 mx-6 my-12 rounded-lg p-6 max-w-7xl mx-auto"
      >
        <h3 class="font-bold text-amber-900 mb-4">Important Conditions</h3>
        <ul class="space-y-2 text-sm text-amber-800">
          <li>
            • De-minimis concessions apply only to courier, parcel post, and
            unaccompanied baggage imports
          </li>
          <li>
            • Items must be declared on the customs declaration form (CusDec)
          </li>
          <li>
            • Restricted or prohibited items cannot be imported even if below
            thresholds
          </li>
          <li>
            • Professional appraisers may inspect goods to verify value
            declarations
          </li>
          <li>
            • False declarations may result in penalties, seizure, and legal
            action
          </li>
          <li>
            • Passengers claiming baggage allowance must carry valid
            identification (passport)
          </li>
        </ul>
      </div>

      <!-- Reference Section -->
      <div class="bg-white py-12 border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="text-2xl font-serif font-bold text-gov-dark mb-6">
            Legal References
          </h2>
          <div class="bg-gov-dark text-white p-6 rounded-lg">
            <h4 class="font-bold mb-3">Gazette Notifications & Acts</h4>
            <ul class="space-y-2 text-sm opacity-90">
              <li>
                • Gazette Notification No. 2044/31 - de-minimis Business Samples
                (DMB)
              </li>
              <li>
                • Value Added Tax Act No. 14 of 2002 - VAT exemptions and
                thresholds
              </li>
              <li>
                • Customs Ordinance - Chapter 235 - Schedule A (Concessions) and
                Schedule E
              </li>
              <li>
                • WTO Trade Facilitation Agreement (TFA) - Expedited Shipments
                provisions
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Help Section -->
      <div class="bg-white py-12 border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="text-2xl font-serif font-bold text-gov-dark mb-8">
            Need Help?
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              routerLink="/help"
              class="bg-gov-light text-white p-6 rounded-lg hover:shadow-lg transition"
            >
              <h4 class="font-bold mb-2">FAQ & Help Center</h4>
              <p class="text-sm opacity-90">
                Find answers to common questions about imports and duties
              </p>
              <p class="mt-3 text-sm font-medium">Learn more →</p>
            </a>
            <a
              routerLink="/contact"
              class="bg-gov-dark text-white p-6 rounded-lg hover:shadow-lg transition"
            >
              <h4 class="font-bold mb-2">Contact Customs</h4>
              <p class="text-sm opacity-90">
                Get in touch with Sri Lanka Customs for specific guidance
              </p>
              <p class="mt-3 text-sm font-medium">Contact us →</p>
            </a>
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
export class PersonalAllowancesPage {}
