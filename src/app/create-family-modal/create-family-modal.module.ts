import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateFamilyModalPageRoutingModule } from './create-family-modal-routing.module';

import { CreateFamilyModalPage } from './create-family-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateFamilyModalPageRoutingModule
  ],
  declarations: [CreateFamilyModalPage]
})
export class CreateFamilyModalPageModule {}
