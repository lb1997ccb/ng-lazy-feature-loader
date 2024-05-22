import {Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {NewsPageComponent} from "../../features/pages/news/news-page.component";


@Injectable({
  providedIn: 'root',
})
export class NewsFeatureResolver
  implements Resolve<typeof NewsPageComponent>
{
  resolve(): Promise<typeof NewsPageComponent> {
    return import('../../features/pages/news/news-page.component').then(
      m => m.NewsPageComponent
    );
  }
}
