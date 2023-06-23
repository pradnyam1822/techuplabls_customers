import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import { FileUploadModule } from 'ng2-file-upload';

import { CommonFormsRoutingModule } from './common-forms-routing.module';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CreatePinComponent } from './create-pin/create-pin.component';

const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'id',
  optionTextField: 'name'
};

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFormsRoutingModule,
    NgxSelectModule.forRoot(CustomSelectOptions),
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    FileUploadModule
  ],
  declarations: [
    CreateCustomerComponent,
    CreatePinComponent
  ],
})
export class CommonFormsModule { }
