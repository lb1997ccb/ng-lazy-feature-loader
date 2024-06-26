import {
  Component,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  EventEmitter,
} from "@angular/core";
import { FeatureLoaderService } from "./service/feature-loader/feature-loader.service";

/**
 * Main component of the application.
 * Responsible for loading and managing dynamic features.
 */
@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
  title = "ng-lazy-feature-loader";

  /** Reference to the container where dynamic components will be loaded */
  @ViewChild("container", { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  /**
   * Constructor to inject required services.
   * @param featureLoaderService Service responsible for loading dynamic features.
   */
  constructor(private featureLoaderService: FeatureLoaderService) {}

  /**
   * Lifecycle hook called after the view has been initialized.
   * It triggers the loading of the home feature component.
   */
  ngAfterViewInit(): void {
    this.loadHomeFeature();
  }

  /**
   * Loads the home feature component into the container.
   * Throws an error if the container is undefined.
   */
  private loadHomeFeature(): void {
    if (!this.container) {
      throw new Error("Container is undefined");
    }

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

  /**
   * Handles the event when home click is requested.
   * @param eventKey Key identifying the requested feature.
   */
  private handleFeatureRequested(eventKey: string): void {
    if (!this.container) {
      throw new Error("Container is undefined");
    }

    this.loadFeature(eventKey)
      .then((loadedComponent) => {
        if (loadedComponent && "backToHomeRequested" in loadedComponent) {
          const eventEmitter = (
            loadedComponent as { backToHomeRequested: EventEmitter<void> }
          ).backToHomeRequested;
          eventEmitter.subscribe(() => {
            this.loadHomeFeature();
          });
        } else {
          console.error("Loaded component does not have backToHomeRequested.");
        }
      })
      .catch((error) => {
        console.error("Error loading feature component:", error);
      });
  }

  /**
   * Loads the requested feature component based on the eventKey.
   * @param eventKey Key identifying the requested feature.
   * @returns Promise<any> A promise that resolves with the loaded component.
   */
  private loadFeature(eventKey: string): Promise<any> {
    let loadFeaturePromise: Promise<any>;

    switch (eventKey) {
      case "news":
        loadFeaturePromise = this.featureLoaderService.loadNewsFeatureComponent(
          this.container,
        );
        break;
      case "service":
        loadFeaturePromise =
          this.featureLoaderService.loadServiceFeatureComponent(this.container);
        break;
      default:
        console.error("Unsupported eventKey:", eventKey);
        return Promise.reject("Unsupported eventKey");
    }

    return loadFeaturePromise;
  }
}
