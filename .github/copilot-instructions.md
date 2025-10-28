# GitHub Copilot Instructions for Fusion Angular Tailwind Starter

## Project Overview

This is an Angular 20 application using TypeScript and TailwindCSS 3.4.11 for styling. The project follows Angular's modern standalone component architecture and uses Angular CLI with Vite for building.

## Technology Stack

- **Framework**: Angular 20 with standalone components
- **Language**: TypeScript 5.8.2
- **Styling**: TailwindCSS 3.4.11 with Typography plugin
- **Build Tool**: Angular CLI with Vite
- **Testing**: Jasmine + Karma via `ng test`
- **Package Manager**: npm

## Project Structure

```
src/
├── app/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components (route targets)
│   ├── data/          # Mock data and static content
│   ├── app.config.ts  # Application configuration
│   ├── app.routes.ts  # Route definitions
│   └── app.ts         # Root component
├── styles.css         # Global styles with TailwindCSS imports
└── main.ts           # Application bootstrap
```

## Coding Guidelines

### Angular Components

1. **Always use standalone components**:
   ```typescript
   @Component({
     selector: 'app-my-component',
     standalone: true,
     imports: [CommonModule, FormsModule, RouterLink],
     template: `...`
   })
   export class MyComponent {}
   ```

2. **Component organization**:
   - Place reusable UI components in `src/app/components/`
   - Place page components in `src/app/pages/`
   - Use inline templates for small components
   - Use separate `.html` files for larger templates

3. **Use Angular signals for state management**:
   ```typescript
   import { Component, signal } from '@angular/core';
   
   export class MyComponent {
     count = signal(0);
   }
   ```

### TailwindCSS Styling

1. **Use utility classes** instead of custom CSS:
   ```html
   <div class="flex items-center justify-center p-4 bg-white rounded-lg shadow">
     <h2 class="text-xl font-bold text-gray-900">Title</h2>
   </div>
   ```

2. **Follow existing color scheme**:
   - Primary colors: Use `gov-primary`, `gov-dark`, `gov-bg` custom classes
   - Standard colors: Use Tailwind's built-in color palette (slate, gray, blue, etc.)

3. **Responsive design**: Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)

4. **Custom utilities**: Define in `src/styles.css` using `@layer components`

### TypeScript Conventions

1. **Use strict typing**: Avoid `any` type, prefer explicit types or interfaces
2. **Define interfaces** for complex data structures
3. **Use const assertions** for literal types when appropriate
4. **Export types/interfaces** that are used across multiple files

### Routing

1. **Define routes** in `src/app/app.routes.ts`:
   ```typescript
   export const routes: Routes = [
     { path: '', component: HomePage },
     { path: 'my-page', component: MyPageComponent },
   ];
   ```

2. **Use RouterLink** for navigation in templates:
   ```html
   <a routerLink="/my-page" class="text-blue-600">Go to page</a>
   ```

## Development Workflow

### Commands

- `npm start` or `ng serve` - Start development server
- `npm run build` - Production build
- `npm run watch` - Build with watch mode
- `npm test` - Run tests

### Testing

1. **Unit tests**: Place test files next to components (e.g., `component.spec.ts`)
2. **Follow existing test patterns**: Use Jasmine/Karma testing framework
3. **Test coverage**: Aim to test component logic and user interactions

### Code Style

1. **No unnecessary comments**: Code should be self-documenting
2. **Use meaningful variable names**: Prefer `vehicleType` over `vt`
3. **Keep components focused**: Single responsibility principle
4. **Avoid deep nesting**: Extract complex logic into separate functions

## Adding New Features

### New Component

1. Create file in `src/app/components/my-component.ts`
2. Define as standalone component with imports
3. Export the component class
4. Import where needed

### New Page

1. Create file in `src/app/pages/my-page.ts`
2. Define as standalone component
3. Add route in `src/app/app.routes.ts`
4. Link to page using RouterLink

### New Data/Types

1. Define interfaces/types in the component file or shared file
2. Place mock data in `src/app/data/` directory
3. Export for use across components

## Important Notes

- This project uses **standalone components** (no NgModules)
- Always import required Angular modules in component's `imports` array
- TailwindCSS is the primary styling method (avoid inline styles or separate CSS files)
- The project follows Angular's latest best practices (v20)
- See `AGENTS.md` for detailed project documentation

## Resources

- [Angular Documentation](https://angular.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Angular CLI Reference](https://angular.dev/tools/cli)
