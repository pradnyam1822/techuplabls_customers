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
    // var pinsData:any = [];
    // localStorage.setItem('pinsData', JSON.stringify(pinsData));
    // var custData:any = [];
    // localStorage.setItem('custData', JSON.stringify(custData));
  }

  ngOnDestroy() {
    localStorage.removeItem('pinsData');
    localStorage.removeItem('custData');
  }

  createCustomer() {
    const dialogRef = this.dialog.open(CreateCustomerComponent,{
      hasBackdrop: true,
      width: '60%',
      height: '70%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  createPin() {
    const dialogRef = this.dialog.open(CreatePinComponent,{
      hasBackdrop: true,
      width: '60%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
