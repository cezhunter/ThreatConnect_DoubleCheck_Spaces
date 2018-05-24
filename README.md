# TC DoubleCheck Configuration Manager

Spaces app to manage the configuration used by the TC DoubleCheck playbook.

## Getting Started

1. Setup your environment for testing:

```
make setup
```

2. Run the app to get started:

```
make run
```

This is using the [ng serve](https://github.com/angular/angular-cli/wiki/serve) command to run the app. You can leave this running and it will refresh to serve the most up to date version of the app as you make changes. Let's leave it running an open a new tab in your command line.

3. Let's get familiar with the app by removing the pop-up that says "This is the start of something great!":

- Open `src/app/main.component.ts`
- Remove the line that says:

```typescript
this.messages.showSuccess('Success Message', 'This is the start of something great!');
```

Now check the app and you will see that the pop-up is no longer shown. The `main.component.ts` file can be considered the quarter-back for the app. The routes are defined in `src/app/app-routing.module.ts` and you can change a route by calling the `goTo` function in `main.component.ts`.

4. To add a new [component](https://angular.io/guide/architecture-components) to the app, run:

```
cd src/app/
mkdir components # only have to do this the first time you create a component
cd components
ng generate component <COMPONENT_NAME>
```

## Build App For Release

```
make pack
```

This will package the app as `target/TCS_-_TC_Double_Check_Config_Manager.tcx`.

## Build App in Development Mode (does not minify or uglify code, so it can be debugged in browser)

```
make pack-dev
```

## Deploy

In the ThreatConnect UI install the App (the `.tcx` file) created in the [Build App for Release](#build-app-for-release) section.

## Credits

This package was created with [Cookiecutter](https://github.com/audreyr/cookiecutter) and [Floyd Hightower's Spaces App Template](https://github.com/fhightower-templates/threatconnect-angular-spaces-template).
