import { NgModule } from "@angular/core";
import { HomeFeatureComponent } from "./home-feature.component";
import { CommonModule } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { FeatureLoaderService } from "../../service/feature-loader/feature-loader.service";

@NgModule({
  declarations: [HomeFeatureComponent],
  imports: [CommonModule, MatButton],
  exports: [HomeFeatureComponent],
  providers: [FeatureLoaderService],
})
export class HomeFeatureModule {}
