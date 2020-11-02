import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';
import { AgmOverlays } from "agm-overlays"

import { MainPage } from './main.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmOverlays,
    MainPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBe3JHlgbT58Bqcib-8oOZluGIONW4vilY'
    })
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
