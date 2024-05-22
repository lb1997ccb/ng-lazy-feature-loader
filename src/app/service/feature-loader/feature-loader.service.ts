import {ComponentFactoryResolver, ComponentRef, Injectable, Injector, ViewContainerRef,} from '@angular/core';
import {HomeFeatureResolver} from "../../shared/resolvers/home-feature.resolver";
import {HomeFeatureComponent} from "../../features/home/home-feature.component";
import {NewsPageComponent} from "../../features/pages/news/news-page.component";
import {NewsFeatureResolver} from "../../shared/resolvers/news-feature.resolver";
import {ServiceFeatureResolver} from "../../shared/resolvers/service-feature.resolver";
import {ServicePageComponent} from "../../features/pages/service/service-page.component";

@Injectable({
  providedIn: 'root',
})
export class FeatureLoaderService {
  constructor(
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private homeFeatureResolver: HomeFeatureResolver,
    private newsFeatureResolver: NewsFeatureResolver,
    private serviceFeatureResolver: ServiceFeatureResolver
  ) {
    // no empty
  }

  async loadHomeFeatureComponent(
    container?: ViewContainerRef
  ): Promise<ComponentRef<HomeFeatureComponent>> {
    if (!container) {
      throw new Error('Container is undefined');
    }
    const featureComponent = await this.homeFeatureResolver.resolve();
    const componentFactory = this.cfr.resolveComponentFactory(featureComponent);

    container.clear();
    const componentRef = container.createComponent(componentFactory, undefined, this.injector);
    return componentRef;
  }

  async loadNewsFeatureComponent(
    container?: ViewContainerRef
  ): Promise<ComponentRef<NewsPageComponent>> {
    if (!container) {
      throw new Error('Container is undefined');
    }
    const featureComponent = await this.newsFeatureResolver.resolve();
    const componentFactory = this.cfr.resolveComponentFactory(featureComponent);

    container.clear();
    const componentRef = container.createComponent(componentFactory, undefined, this.injector);
    return componentRef;
  }

  async loadServiceFeatureComponent(
    container?: ViewContainerRef
  ): Promise<ComponentRef<ServicePageComponent>> {
    if (!container) {
      throw new Error('Container is undefined');
    }
    const featureComponent = await this.serviceFeatureResolver.resolve();
    const componentFactory = this.cfr.resolveComponentFactory(featureComponent);

    container.clear();
    const componentRef = container.createComponent(componentFactory, undefined, this.injector);
    return componentRef;
  }
}
