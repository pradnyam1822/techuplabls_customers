import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PinsComponent } from './pins/pins.component';

const routes: Routes = [
  {
    path: '',
    component: PinsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
