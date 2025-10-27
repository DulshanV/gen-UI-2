import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg border-b-4 border-red-600">
      <div class="max-w-7xl mx-auto px-6 py-6">
        <div class="flex items-center gap-6">
          <!-- Logo and Branding -->
          <div class="flex items-center gap-4 flex-1">
            <div class="bg-white rounded-lg p-3 shadow-md">
              <svg class="w-8 h-8 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-white">Sri Lanka Customs</h1>
              <p class="text-sm text-slate-300">Trade Regulatory Guidance Portal</p>
            </div>
          </div>

          <!-- Navigation -->
          <nav class="flex items-center gap-6">
            <a routerLink="/" class="text-slate-200 hover:text-white font-medium transition">
              Home
            </a>
            <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition">
              Contact Customs ICT
            </button>
          </nav>
        </div>

        <!-- Disclaimer Banner -->
        <div class="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <svg class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <div>
            <p class="text-sm font-semibold text-yellow-800">Disclaimer:</p>
            <p class="text-xs text-yellow-700 mt-1">This portal provides guidance only and is not a substitute for formal customs declarations. For binding rulings, contact the Customs ICT Directorate directly. All information is based on current regulations and may be subject to change.</p>
          </div>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {}
