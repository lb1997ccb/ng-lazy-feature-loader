import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home-feature',
  templateUrl: './home-feature.component.html',
  styleUrl: './home-feature.component.scss',
})
export class HomeFeatureComponent implements OnInit {
  @Output() homeClickRequested: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    console.log('HomeFeatureComponent');
  }

  homeClickRequest(eventKey: string): void {
    this.homeClickRequested.emit(eventKey);
  }
}
