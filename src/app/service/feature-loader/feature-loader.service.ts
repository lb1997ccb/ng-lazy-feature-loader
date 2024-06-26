import {
  Injectable,
  Injector,
  Type,
  ViewContainerRef,
} from "@angular/core";
import { HomeFeatureResolver } from "../../shared/resolvers/home-feature.resolver";
import { HomeFeatureComponent } from "../../features/home/home-feature.component";
import { NewsFeatureResolver } from "../../shared/resolvers/news-feature.resolver";
import { NewsPageComponent } from "../../features/pages/news/news-page.component";
import { ServiceFeatureResolver } from "../../shared/resolvers/service-feature.resolver";
import { ServicePageComponent } from "../../features/pages/service/service-page.component";

@Injectable({
  providedIn: "root",
})
export class FeatureLoaderService {
  constructor(
      private injector: Injector, // Angular's Injector for dependency injection
      private homeFeatureResolver: HomeFeatureResolver, // Resolver for Home Feature component
      private newsFeatureResolver: NewsFeatureResolver, // Resolver for News Feature component
      private serviceFeatureResolver: ServiceFeatureResolver, // Resolver for Service Feature component
  ) {}

  /**
   * Loads the Home Feature component into the specified container.
   * @param container ViewContainerRef where the component should be loaded
   * @returns Promise resolving to the loaded HomeFeatureComponent instance
   */
  async loadHomeFeatureComponent(
      container: ViewContainerRef,
  ): Promise<HomeFeatureComponent> {
    return this.loadFeatureComponent(
        () => this.homeFeatureResolver.resolve(), // Resolve the Home Feature component asynchronously
        container,
    );
  }

  /**
   * Loads the News Feature component into the specified container.
   * @param container ViewContainerRef where the component should be loaded
   * @returns Promise resolving to the loaded NewsPageComponent instance
   */
  async loadNewsFeatureComponent(
      container: ViewContainerRef,
  ): Promise<NewsPageComponent> {
    return this.loadFeatureComponent(
        () => this.newsFeatureResolver.resolve(), // Resolve the News Feature component asynchronously
        container,
    );
  }

  /**
   * Loads the Service Feature component into the specified container.
   * @param container ViewContainerRef where the component should be loaded
   * @returns Promise resolving to the loaded ServicePageComponent instance
   */
  async loadServiceFeatureComponent(
      container: ViewContainerRef,
  ): Promise<ServicePageComponent> {
    return this.loadFeatureComponent(
        () => this.serviceFeatureResolver.resolve(), // Resolve the Service Feature component asynchronously
        container,
    );
  }

  /**
   * Helper method to load a feature component into the specified container.
   * @param resolver Function that resolves to the type of the component to load
   * @param container ViewContainerRef where the component should be loaded
   * @returns Promise resolving to the loaded component instance
   */
  private async loadFeatureComponent<T>(
      resolver: () => Promise<Type<T>>,
      container: ViewContainerRef,
  ): Promise<T> {
    const featureComponent = await resolver(); // Resolve the component type asynchronously

    container.clear(); // Clear any existing content in the container

    const componentRef = container.createComponent(featureComponent, {
      injector: this.injector, // Use Angular's Injector for dependency injection
    }); // Create and insert the component into the container directly

    return componentRef.instance; // Return the instance of the loaded component
  }
}
