import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.scss'
})
export class ServicePageComponent {
  @Output() backToHomeRequested: EventEmitter<void> = new EventEmitter<void>();

  requestBackToHome(): void {
    this.backToHomeRequested.emit();
  }
}
