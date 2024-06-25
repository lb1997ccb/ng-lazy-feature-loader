import { Component, EventEmitter, Output } from "@angular/core";

/**
 * Component for Home Feature functionality.
 */
@Component({
  selector: "app-home-feature",
  templateUrl: "./home-feature.component.html",
  styleUrls: ["./home-feature.component.scss"],
})
export class HomeFeatureComponent {
  /**
   * Event emitter for home click requests.
   * Emits a string representing the event key.
   */
  @Output() featureRequested: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Handles the click event and emits the event key.
   * @param eventKey The key representing the event ('news' or 'service').
   */
  requestFeature(eventKey: string): void {
    this.featureRequested.emit(eventKey);
  }
}
