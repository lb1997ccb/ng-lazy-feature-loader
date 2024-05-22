import {AfterViewInit, Component, ViewChild, ViewContainerRef} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FeatureLoaderService} from "./service/feature-loader/feature-loader.service";
import {HomeFeatureModule} from "./features/home/home-feature.module";
import {CommonModule} from "@angular/common";
import {HomeFeatureResolver} from "./shared/resolvers/home-feature.resolver";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HomeFeatureModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'component-resolver-demo';

  @ViewChild('container', { read: ViewContainerRef })
  container?: ViewContainerRef;

  constructor(private featureLoaderService: FeatureLoaderService) {
    // no empty
  }

  ngAfterViewInit() {
    if (!this.container) {
      throw new Error('Container is undefined');
    }
    this.loadHomeFeature();
  }

  private loadHomeFeature(): void {
    this.featureLoaderService.loadHomeFeatureComponent(this.container)
      .then((homeComponentRef) => {
        homeComponentRef.instance.homeClickRequested!.subscribe((eventKey: string) => {
          this.handleHomeClickRequested(eventKey);
        });
      });
  }

  private handleHomeClickRequested(eventKey: string): void {
    if (!this.container) {
      throw new Error('Container is undefined');
    }
    if (eventKey === 'news') {
      this.featureLoaderService.loadNewsFeatureComponent(this.container)
        .then((newsComponentRef) => {
          newsComponentRef.instance.backToHomeRequested!.subscribe(() => {
            this.loadHomeFeature();
          });
        });
    } else if (eventKey === 'service') {
      this.featureLoaderService.loadServiceFeatureComponent(this.container)
        .then((serviceComponentRef) => {
          serviceComponentRef.instance.backToHomeRequested!.subscribe(() => {
            this.loadHomeFeature();
          });
        });
    }
  }
}
