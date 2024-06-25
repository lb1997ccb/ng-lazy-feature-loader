# ComponentResolverDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.
This Angular project consists of several components and a service that collaborate to load dynamic content components and navigate between them.
The key components are `AppComponent`, `HomeFeatureComponent`, `NewsPageComponent`, `ServicePageComponent`, `FeatureLoaderService` and the component resolvers e.g. `HomeFeatureResolver`.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Key Methods and Their Functionality

### AppComponent

The method `loadHomeFeature()` loads the `HomeFeatureComponent` and adds an event listener to respond to click events.
This invokes the `featureLoaderService.loadHomeFeatureComponent` to dynamically load the `HomeFeatureComponent`.
Once the component is loaded, an event listener is set on `featureRequested` to respond to click events.

```ts
private loadHomeFeature(): void {
  this.featureLoaderService.loadHomeFeatureComponent(this.container)
    .then((homeComponentRef) => {
      homeComponentRef.instance.featureRequested!.subscribe((eventKey: string) => {
        this.handleHomeClickRequested(eventKey);
      });
    });
}
```

The method `handleHomeClickRequested(eventKey: string)` handles the click events from the `HomeFeatureComponent` and accordingly loads either the `NewsPageComponent` or the `ServicePageComponent`.
Initially, it checks if the container is defined. Based on the `eventKey`, either the `NewsPageComponent` or the `ServicePageComponent` is loaded.
After the respective component is loaded, an event listener is added to respond to `backToHomeRequested` and return to the `HomeFeatureComponent`.

```ts
private handleHomeClickRequested(eventKey: string): void {
  if (!this.container) {
    throw new Error('Container is undefined');
  }
  if (eventKey === 'news') {
    this.featureLoaderService.loadNewsFeatureComponent(this.container)
      .then((newsComponentRef) => {
        newsComponentRef.instance.backToHomeRequested!.subscribe(() => {
          this.loadHomeFeature();
        });
      });
  } else if (eventKey === 'service') {
    this.featureLoaderService.loadServiceFeatureComponent(this.container)
      .then((serviceComponentRef) => {
        serviceComponentRef.instance.backToHomeRequested!.subscribe(() => {
          this.loadHomeFeature();
        });
      });
  }
}
```

### FeatureLoaderService

The method `loadHomeFeatureComponent(container?: ViewContainerRef): Promise<ComponentRef<HomeFeatureComponent>>` dynamically loads the `HomeFeatureComponent` into the specified `ViewContainerRef`.
It checks if the container is defined. Then, `homeFeatureResolver.resolve` is invoked to dynamically load the `HomeFeatureComponent`. A `ComponentFactory` is created and used to instantiate the component within the container.
The container is cleared before the new component is created. A `ComponentRef of the created component is returned.

```ts
async loadHomeFeatureComponent(
  container?: ViewContainerRef
): Promise<ComponentRef<HomeFeatureComponent>> {
  if (!container) {
    throw new Error('Container is undefined');
  }
  const featureComponent = await this.homeFeatureResolver.resolve();
  const componentFactory = this.cfr.resolveComponentFactory(featureComponent);

  container.clear();
  const componentRef = container.createComponent(componentFactory, undefined, this.injector);
  return componentRef;
}
```

### HomeFeatureResolver

The method `resolve()` in the `HomeFeatureResolver` dynamically resolves the `HomeFeatureComponent`. This method asynchronously loads the `HomeFeatureComponent` using dynamic imports.
It utilizes `await import('../../features/home/home-feature.component')` to import the module containing the `HomeFeatureComponent`. Finally, `m.HomeFeatureComponent` is returned to reference the `HomeFeatureComponent`.

```ts
async resolve(): Promise<typeof HomeFeatureComponent> {
  const m = await import('../../features/home/home-feature.component');
  return m.HomeFeatureComponent;
}
```

## Summary

These methods work together to load dynamic content components in an Angular application and navigate between them.
By utilizing event emitters and asynchronous resolvers, the application can be designed to be flexible and modular.
