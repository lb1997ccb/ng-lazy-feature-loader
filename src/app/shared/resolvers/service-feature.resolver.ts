import {Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {NewsPageComponent} from "../../features/pages/news/news-page.component";
import {ServicePageComponent} from "../../features/pages/service/service-page.component";


@Injectable({
  providedIn: 'root',
})
export class ServiceFeatureResolver
  implements Resolve<typeof ServicePageComponent>
{
  resolve(): Promise<typeof NewsPageComponent> {
    return import('../../features/pages/service/service-page.component').then(
      m => m.ServicePageComponent
    );
  }
}
