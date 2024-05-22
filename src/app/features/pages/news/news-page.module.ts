import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {NewsPageComponent} from "./news-page.component";
import {MatButton} from "@angular/material/button";

@NgModule({
  declarations: [NewsPageComponent],
  imports: [
    CommonModule,
    MatButton
  ],
  exports: [NewsPageComponent]
})
export class NewsPageModule {}
