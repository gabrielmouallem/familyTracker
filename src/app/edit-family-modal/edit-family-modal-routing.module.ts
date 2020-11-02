import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFamilyModalPage } from './edit-family-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditFamilyModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFamilyModalPageRoutingModule {}
