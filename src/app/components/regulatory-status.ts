import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegulatoryDetail } from '../data/search-mock';

@Component({
  selector: 'app-regulatory-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <!-- Traffic Light Status Banner -->
      <div
        [ngClass]="{
          'bg-red-50 border-l-4 border-red-600': status === 'prohibited',
          'bg-yellow-50 border-l-4 border-yellow-600': status === 'restricted',
          'bg-green-50 border-l-4 border-green-600': status === 'free'
        }"
        class="p-6 rounded-lg"
      >
        <div class="flex items-center gap-4">
          <div
            [ngClass]="{
              'bg-red-600': status === 'prohibited',
              'bg-yellow-600': status === 'restricted',
              'bg-green-600': status === 'free'
            }"
            class="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center"
          >
            <svg
              *ngIf="status === 'prohibited'"
              class="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              />
            </svg>
            <svg
              *ngIf="status === 'restricted'"
              class="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
              />
            </svg>
            <svg
              *ngIf="status === 'free'"
              class="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>
          </div>

          <div class="flex-1">
            <h2
              [ngClass]="{
                'text-red-900': status === 'prohibited',
                'text-yellow-900': status === 'restricted',
                'text-green-900': status === 'free'
              }"
              class="text-2xl font-bold"
            >
              {{
                status === 'prohibited'
                  ? 'PROHIBITED'
                  : status === 'restricted'
                    ? 'RESTRICTED'
                    : 'FREE / UNRESTRICTED'
              }}
            </h2>
            <p
              [ngClass]="{
                'text-red-700': status === 'prohibited',
                'text-yellow-700': status === 'restricted',
                'text-green-700': status === 'free'
              }"
              class="mt-2"
            >
              {{
                status === 'prohibited'
                  ? 'This item is completely prohibited from import.'
                  : status === 'restricted'
                    ? 'This item requires specific approvals and permits before import.'
                    : 'This item can be imported without restrictions.'
              }}
            </p>
          </div>
        </div>
      </div>

      <!-- Permit Table (if restricted) -->
      <div *ngIf="status === 'restricted' && permits && permits.length > 0">
        <h3 class="text-xl font-bold text-slate-900 mb-4">Required Permits & Approvals</h3>
        <div class="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
          <table class="w-full">
            <thead>
              <tr class="bg-slate-100 border-b border-slate-200">
                <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                  Government Agency
                </th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                  Requirement
                </th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                *ngFor="let permit of permits; let last = last"
                [ngClass]="{ 'border-b border-slate-100': !last }"
              >
                <td class="px-6 py-4 text-slate-900 font-medium">{{ permit.oga }}</td>
                <td class="px-6 py-4 text-slate-700">{{ permit.requirement }}</td>
                <td class="px-6 py-4">
                  <span
                    [ngClass]="{
                      'bg-red-100 text-red-800': permit.status === 'mandatory',
                      'bg-yellow-100 text-yellow-800': permit.status === 'conditional',
                      'bg-blue-100 text-blue-800': permit.status === 'optional'
                    }"
                    class="px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {{ permit.status | uppercase }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <a
                    [href]="permit.actionLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-blue-600 hover:text-blue-800 font-medium underline"
                  >
                    Visit Agency
                    <svg
                      class="inline w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class RegulatoryStatusComponent {
  @Input() status: 'prohibited' | 'restricted' | 'free' = 'free';
  @Input() permits: RegulatoryDetail[] | null = null;
}
