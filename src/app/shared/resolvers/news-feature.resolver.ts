import { Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { NewsPageComponent } from "../../features/pages/news/news-page.component";

@Injectable({
  providedIn: "root",
})
export class NewsFeatureResolver implements Resolve<typeof NewsPageComponent> {
  /**
   * Resolves to the NewsPageComponent type asynchronously.
   * @returns Promise resolving to the NewsPageComponent type
   */
  resolve(): Promise<typeof NewsPageComponent> {
    // Dynamically import the NewsPageComponent
    return import("../../features/pages/news/news-page.component").then(
      (m) => m.NewsPageComponent,
    );
  }
}
