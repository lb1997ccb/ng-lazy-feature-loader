import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'app-news-page-feature',
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.scss'
})
export class NewsPageComponent {
  @Output() backToHomeRequested: EventEmitter<void> = new EventEmitter<void>();

  requestBackToHome(): void {
    this.backToHomeRequested.emit();
  }
}
