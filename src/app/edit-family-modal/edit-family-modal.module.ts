import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFamilyModalPageRoutingModule } from './edit-family-modal-routing.module';

import { EditFamilyModalPage } from './edit-family-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditFamilyModalPageRoutingModule
  ],
  declarations: [EditFamilyModalPage]
})
export class EditFamilyModalPageModule {}
