import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SissaPageRoutingModule } from './sissa-page-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SissaPageRoutingModule
  ]
})
export class SissaPageModule { }
