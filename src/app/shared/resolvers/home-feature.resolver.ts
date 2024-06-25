import { Resolve } from "@angular/router";
import { HomeFeatureComponent } from "../../features/home/home-feature.component";
import { Injectable } from "@angular/core";
import { NewsPageComponent } from "../../features/pages/news/news-page.component";

@Injectable({
  providedIn: "root",
})
export class HomeFeatureResolver
  implements Resolve<typeof HomeFeatureComponent>
{
  /**
   * Resolves to the HomeFeatureComponent type asynchronously.
   * @returns Promise resolving to the HomeFeatureComponent type
   */
  resolve(): Promise<typeof HomeFeatureComponent> {
    // Dynamically import the HomeFeatureComponent
    return import("../../features/home/home-feature.component").then(
      (m) => m.HomeFeatureComponent,
    );
  }
}
