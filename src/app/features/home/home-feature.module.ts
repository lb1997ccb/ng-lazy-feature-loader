import { NgModule } from '@angular/core';
import {HomeFeatureComponent} from "./home-feature.component";
import {CommonModule} from "@angular/common";
import {MatButton} from "@angular/material/button";

@NgModule({
  declarations: [HomeFeatureComponent],
  imports: [
    CommonModule,
    MatButton
  ],
  exports: [HomeFeatureComponent]
})
export class HomeFeatureModule {}
