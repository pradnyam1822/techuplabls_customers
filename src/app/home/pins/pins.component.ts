import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { CreateCustomerComponent } from 'src/app/common-forms/create-customer/create-customer.component';
import { CreatePinComponent } from 'src/app/common-forms/create-pin/create-pin.component';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.scss']
})
export class PinsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  createCustomer() {
    const dialogRef = this.dialog.open(CreateCustomerComponent,{
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  createPin() {
    const dialogRef = this.dialog.open(CreatePinComponent,{
      hasBackdrop: true,
      width: '60%',
      height: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
