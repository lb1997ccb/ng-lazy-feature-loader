import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ServicePageComponent} from "./service-page.component";
import {MatButton} from "@angular/material/button";

@NgModule({
  declarations: [ServicePageComponent],
  imports: [
    CommonModule,
    MatButton
  ],
  exports: [ServicePageComponent]
})
export class NewsPageModule {}
