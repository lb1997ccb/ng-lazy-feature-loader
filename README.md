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

The `FeatureLoaderService` leverages Angular's `ComponentFactoryResolver` and `Injector` to dynamically instantiate and load components into designated `ViewContainerRef` instances. This approach avoids static imports and allows components to be loaded lazily, optimizing initial loading times.

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
import { Component, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FeatureLoaderService } from './feature-loader.service';
import { HomeFeatureComponent } from './features/home/home-feature.component';
import { NewsPageComponent } from './features/pages/news/news-page.component';
import { ServicePageComponent } from './features/pages/service/service-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  constructor(private featureLoaderService: FeatureLoaderService) {}

  ngAfterViewInit() {
    // Example: Load HomeFeatureComponent dynamically
    this.featureLoaderService.loadHomeFeatureComponent(this.container)
      .then((homeComponent: HomeFeatureComponent) => {
        // HomeFeatureComponent loaded successfully
      })
      .catch((error) => {
        console.error('Error loading HomeFeatureComponent:', error);
      });
  }
}
```

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

This project is licensed under the MIT License - see the LICENSE file for details.
