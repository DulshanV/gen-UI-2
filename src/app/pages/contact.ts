import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../components/header';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  template: `
    <app-header></app-header>

    <main class="min-h-screen bg-gov-bg">
      <!-- Breadcrumb -->
      <div class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <a routerLink="/" class="text-gov-dark hover:text-gov-primary font-medium text-sm">
            ← Back to Home
          </a>
        </div>
      </div>

      <!-- Page Title -->
      <div class="bg-white border-b border-gray-200 py-8">
        <div class="max-w-7xl mx-auto px-6">
          <h1 class="text-3xl font-serif font-bold text-gov-dark mb-2">Contact Customs ICT Directorate</h1>
          <p class="text-gray-600">Get assistance with tariff classifications and import/export queries</p>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Contact Form -->
            <div class="bg-white rounded-lg p-8 shadow-gov">
              <h3 class="text-2xl font-bold text-gov-dark mb-6">Send a Message</h3>
              <form class="space-y-6">
                <div>
                  <label class="block text-sm font-bold text-gov-dark mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-light"
                  />
                </div>

                <div>
                  <label class="block text-sm font-bold text-gov-dark mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-light"
                  />
                </div>

                <div>
                  <label class="block text-sm font-bold text-gov-dark mb-2">Phone (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+94 XX XXX XXXX"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-light"
                  />
                </div>

                <div>
                  <label class="block text-sm font-bold text-gov-dark mb-2">Subject</label>
                  <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-light">
                    <option>Select subject</option>
                    <option>HS Code Classification</option>
                    <option>Duty/Tax Calculation</option>
                    <option>Permit Requirements</option>
                    <option>Portal Feedback</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-bold text-gov-dark mb-2">HS Code (if applicable)</label>
                  <input
                    type="text"
                    placeholder="e.g., 0102.21"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-light font-mono"
                  />
                </div>

                <div>
                  <label class="block text-sm font-bold text-gov-dark mb-2">Message</label>
                  <textarea
                    rows="6"
                    placeholder="Describe your query in detail..."
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-light"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  class="w-full bg-gov-primary hover:bg-gov-dark text-white font-bold py-3 rounded-lg transition"
                >
                  Send Message
                </button>
              </form>
            </div>

            <!-- Information -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-8">
              <h3 class="font-bold text-blue-900 mb-4">Response Time</h3>
              <p class="text-sm text-blue-800">
                Your inquiry will be reviewed by the appropriate Customs department. Expected response time is 2-5 business days. For urgent matters, please call the customs hotline.
              </p>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Contact Information -->
            <div class="bg-gov-dark text-white rounded-lg p-6">
              <h4 class="text-lg font-bold mb-6">Direct Contact</h4>
              <div class="space-y-4">
                <div>
                  <h5 class="font-bold mb-1">Main Office</h5>
                  <p class="text-sm text-gray-300">
                    Sri Lanka Customs<br/>
                    Colombo, Sri Lanka
                  </p>
                </div>
                <div>
                  <h5 class="font-bold mb-1">Customs Hotline</h5>
                  <p class="text-sm text-gray-300">
                    +94 11 XXX XXXX<br/>
                    <span class="text-xs text-gray-400">Available during business hours</span>
                  </p>
                </div>
                <div>
                  <h5 class="font-bold mb-1">Email</h5>
                  <p class="text-sm text-gray-300">
                    ict@customs.gov.lk<br/>
                    classifications@customs.gov.lk
                  </p>
                </div>
                <div>
                  <h5 class="font-bold mb-1">Business Hours</h5>
                  <p class="text-sm text-gray-300">
                    Monday - Friday<br/>
                    8:30 AM - 4:30 PM
                  </p>
                </div>
              </div>
            </div>

            <!-- Departments -->
            <div class="bg-white rounded-lg p-6 shadow-gov">
              <h4 class="font-bold text-gov-dark mb-4">Departments</h4>
              <ul class="space-y-3 text-sm">
                <li>
                  <p class="font-bold text-gov-dark">Classification Unit</p>
                  <p class="text-xs text-gray-600">HS Code classification queries</p>
                </li>
                <li>
                  <p class="font-bold text-gov-dark">Revenue Division</p>
                  <p class="text-xs text-gray-600">Duties, taxes, and valuation</p>
                </li>
                <li>
                  <p class="font-bold text-gov-dark">Regulation Division</p>
                  <p class="text-xs text-gray-600">Restrictions and prohibitions</p>
                </li>
                <li>
                  <p class="font-bold text-gov-dark">ICT Directorate</p>
                  <p class="text-xs text-gray-600">Portal support and feedback</p>
                </li>
              </ul>
            </div>

            <!-- FAQ Link -->
            <div class="bg-gov-accent text-white rounded-lg p-6">
              <h4 class="font-bold mb-3">Before Contacting</h4>
              <p class="text-sm mb-4">Check our FAQ section for quick answers to common questions.</p>
              <a routerLink="/help" class="inline-block bg-white text-gov-dark px-4 py-2 rounded font-semibold text-sm hover:bg-gray-100 transition">
                View FAQ
              </a>
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
  `
})
export class ContactPage {}
