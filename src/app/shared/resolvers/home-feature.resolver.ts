import {Resolve} from "@angular/router";
import {HomeFeatureComponent} from "../../features/home/home-feature.component";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class HomeFeatureResolver
  implements Resolve<typeof HomeFeatureComponent>
{
  async resolve(): Promise<typeof HomeFeatureComponent> {
    const m = await import('../../features/home/home-feature.component');
    return m.HomeFeatureComponent;
  }
}
