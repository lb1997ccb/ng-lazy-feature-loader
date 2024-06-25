import { Component, EventEmitter, Output } from "@angular/core";

/**
 * Component for the News Page feature.
 */
@Component({
  selector: "app-news-page-feature",
  templateUrl: "./news-page.component.html",
  styleUrls: ["./news-page.component.scss"],
})
export class NewsPageComponent {
  /**
   * Event emitter for back to home requests.
   * Emits an empty void event when back to home is requested.
   */
  @Output() backToHomeRequested: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Handles the request to navigate back to the home page.
   * Emits the backToHomeRequested event.
   */
  requestBackToHome(): void {
    this.backToHomeRequested.emit();
  }
}
