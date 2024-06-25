import { Component, EventEmitter, Output } from "@angular/core";

/**
 * Component for the Service Page feature.
 */
@Component({
  selector: "app-service-page",
  templateUrl: "./service-page.component.html",
  styleUrls: ["./service-page.component.scss"],
})
export class ServicePageComponent {
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
