import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { NewPinComponent } from './new-pin/new-pin.component';



@NgModule({
  declarations: [
    NewCustomerComponent,
    NewPinComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommonComponentsModule { }
