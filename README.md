# ng-lazy-feature-loader

This project demonstrates Angular's capability to dynamically load components and modules on-demand, enhancing application performance by loading resources only when needed.

## Overview

Angular applications can benefit from lazy loading techniques to improve initial loading times and resource efficiency. This project showcases how to implement dynamic component loading without relying on Angular's built-in routing mechanism.

## Features

- **Dynamic Component Loading:** Load components dynamically based on user interactions or application state.
- **Efficient Resource Management:** Components and modules are loaded lazily, improving initial load times.
- **Flexible Integration:** Easily integrate dynamic loading into existing Angular projects without routing dependencies.

## Usage

### Installation

To get started with this project, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Run the application using `ng serve`.

## FeatureLoaderService

The `FeatureLoaderService` in this project facilitates dynamic loading of Angular components based on asynchronous resolution through resolvers. It enhances modularity and performance by selectively loading components only when needed.

### Overview

The `FeatureLoaderService` utilizes Angular's Ivy APIs, specifically the `ViewContainerRef.createComponent` method, to dynamically instantiate and load components into designated `ViewContainerRef` instances. This approach avoids static imports and enables lazy loading of components, optimizing initial loading times and reducing the application's initial bundle size.

### Usage

#### Dependencies

Ensure the following resolvers and components are correctly implemented and available for resolution:

- `HomeFeatureResolver`: Resolves to `HomeFeatureComponent`
- `NewsFeatureResolver`: Resolves to `NewsPageComponent`
- `ServiceFeatureResolver`: Resolves to `ServicePageComponent`

#### Methods

- **`loadHomeFeatureComponent(container: ViewContainerRef): Promise<HomeFeatureComponent>`**

  - Loads the `HomeFeatureComponent` into the specified `ViewContainerRef`.

- **`loadNewsFeatureComponent(container: ViewContainerRef): Promise<NewsPageComponent>`**

  - Loads the `NewsPageComponent` into the specified `ViewContainerRef`.

- **`loadServiceFeatureComponent(container: ViewContainerRef): Promise<ServicePageComponent>`**
  - Loads the `ServicePageComponent` into the specified `ViewContainerRef`.

#### Example

```typescript
import {
  Component,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { FeatureLoaderService } from "./service/feature-loader/feature-loader.service";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit {
  @ViewChild("container", { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  constructor(private featureLoaderService: FeatureLoaderService) {}

  ngAfterViewInit() {
    // Example: Load HomeFeatureComponent dynamically
    this.featureLoaderService
      .loadHomeFeatureComponent(this.container)
      .then((homeComponent) => {
        homeComponent.featureRequested!.subscribe((eventKey: string) => {
          this.handleFeatureRequested(eventKey);
        });
      })
      .catch((error) => {
        console.error("Error loading home feature component:", error);
      });
  }
}
```
- **handleFeatureRequested:** This method is located within the `AppComponent` and handles the logic for dynamically loading different feature components based on the `eventKey`.

## Resolvers

### HomeFeatureResolver

The `HomeFeatureResolver` asynchronously resolves to the `HomeFeatureComponent`, allowing dynamic loading based on demand.

### NewsFeatureResolver

The `NewsFeatureResolver` asynchronously resolves to the `NewsPageComponent`, facilitating lazy loading for news-related features.

### ServiceFeatureResolver

The `ServiceFeatureResolver` asynchronously resolves to the `ServicePageComponent`, enabling selective loading of service-related components.

## AppComponent

The `AppComponent` serves as the entry point of the application. It demonstrates how to use the `FeatureLoaderService` to dynamically load feature components into the view.

## Contributing

Contributions to enhance the `FeatureLoaderService` or its associated resolvers are welcome. Please follow the existing patterns and guidelines.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
