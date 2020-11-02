import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateFamilyModalPage } from './create-family-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CreateFamilyModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateFamilyModalPageRoutingModule {}
