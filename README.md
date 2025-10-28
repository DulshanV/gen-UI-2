# FusionAngularTailwindStarter

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.2.

## Live Demo

This application is deployed to GitHub Pages and can be accessed at: [https://dulshanv.github.io/gen-UI-2/](https://dulshanv.github.io/gen-UI-2/)

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Deployment to GitHub Pages

This project is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment is handled by a GitHub Actions workflow (`.github/workflows/deploy-github-pages.yml`).

### Manual Deployment

To manually trigger a deployment:

1. Go to the "Actions" tab in the GitHub repository
2. Select the "Deploy Angular App to GitHub Pages" workflow
3. Click "Run workflow" and select the `main` branch

### Building for GitHub Pages Locally

To build the project for GitHub Pages locally:

```bash
npm run build -- --base-href /gen-UI-2/
```

The build artifacts will be stored in the `dist/fusion-angular-tailwind-starter/browser/` directory.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
