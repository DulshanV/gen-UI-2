import { Component } from '@angular/core';
import { SearchBarComponent } from '../components/search-bar';
import { HeaderComponent } from '../components/header';
import { SearchSuggestion } from '../data/search-mock';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, HeaderComponent],
  template: `
    <app-header></app-header>

    <main class="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Hero Section -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            What Can I Import/Export?
          </h1>
          <p class="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Get instant regulatory guidance, permit requirements, and duty calculations for your products before submitting a customs declaration.
          </p>
        </div>

        <!-- Search Bar -->
        <div class="mb-12">
          <app-search-bar></app-search-bar>
        </div>

        <!-- Feature Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <!-- Feature 1 -->
          <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border-t-4 border-blue-600">
            <div class="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">Instant Regulatory Status</h3>
            <p class="text-slate-600 text-sm">
              Know immediately if your product is prohibited, restricted, or free to import with our traffic-light classification system.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border-t-4 border-green-600">
            <div class="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">Required Permits & Approvals</h3>
            <p class="text-slate-600 text-sm">
              See all required government approvals and agency contacts with direct links to relevant authorities.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border-t-4 border-orange-600">
            <div class="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">Duty & Tax Calculator</h3>
            <p class="text-slate-600 text-sm">
              Estimate total landed costs including customs duty, VAT, and other applicable taxes with our interactive calculator.
            </p>
          </div>
        </div>

        <!-- Info Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <!-- How It Works -->
          <div class="bg-blue-50 rounded-lg p-8 border border-blue-200">
            <h3 class="text-xl font-bold text-slate-900 mb-4">How It Works</h3>
            <ol class="space-y-3 text-slate-700">
              <li class="flex items-start gap-3">
                <span class="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-bold flex-shrink-0">1</span>
                <span>Enter your product name or HS Code in the search bar above</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-bold flex-shrink-0">2</span>
                <span>Select from the dropdown suggestions showing regulatory status</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-bold flex-shrink-0">3</span>
                <span>View your results including permits, duties, and legal notes</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-bold flex-shrink-0">4</span>
                <span>Contact customs if you need a formal ruling or have questions</span>
              </li>
            </ol>
          </div>

          <!-- Quick Facts -->
          <div class="bg-slate-50 rounded-lg p-8 border border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 mb-4">Important Information</h3>
            <ul class="space-y-3 text-slate-700 text-sm">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span><strong>No Login Required:</strong> This is a public tool accessible to all traders</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span><strong>Free to Use:</strong> Guidance provided at no cost to all traders</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span><strong>Guidance Only:</strong> For binding rulings, contact Customs ICT Directorate</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span><strong>Regularly Updated:</strong> Information reflects current customs regulations</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- CTA Footer -->
        <div class="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg p-8 text-white text-center">
          <h3 class="text-2xl font-bold mb-2">Need a Formal Ruling?</h3>
          <p class="text-slate-300 mb-6">
            This tool provides guidance only. For binding official classifications and rulings, contact the Customs ICT Directorate.
          </p>
          <button class="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition">
            Contact Customs ICT Directorate
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 class="font-bold text-white mb-3">About SLC</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition">Official Website</a></li>
              <li><a href="#" class="hover:text-white transition">Tariff Information</a></li>
              <li><a href="#" class="hover:text-white transition">Trade Guidelines</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-white mb-3">Resources</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition">HS Code Database</a></li>
              <li><a href="#" class="hover:text-white transition">Regulations & Acts</a></li>
              <li><a href="#" class="hover:text-white transition">Government Agencies</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-white mb-3">Support</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition">FAQ</a></li>
              <li><a href="#" class="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" class="hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-slate-700 pt-8 text-center text-sm">
          <p>© 2024 Sri Lanka Customs. Trade Regulatory Guidance Portal. All rights reserved.</p>
          <p class="text-xs text-slate-500 mt-2">This portal is maintained by the Customs ICT Directorate</p>
        </div>
      </div>
    </footer>
  `
})
export class HomePage {}
