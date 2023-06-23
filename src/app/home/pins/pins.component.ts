import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { CreateCustomerComponent } from 'src/app/common-forms/create-customer/create-customer.component';
import { CreatePinComponent } from 'src/app/common-forms/create-pin/create-pin.component';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.scss']
})
export class PinsComponent implements OnInit {

  displayedColumns: string[] = ['title', 'image', 'collaboratory', 'privacy'];
  dataSource = new MatTableDataSource();
  isPinsData = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPinsData();
  }

  getPinsData() {
    var pinsData = localStorage.getItem('pinsData');
    if(pinsData != null && JSON.parse(pinsData).length > 0) {
      this.dataSource = new MatTableDataSource(JSON.parse(pinsData));
      this.isPinsData = true;
    }
    else {
      this.isPinsData = false;
    }
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
      // console.log(`Dialog result: ${result}`);
    });
  }

  createPin() {
    const dialogRef = this.dialog.open(CreatePinComponent,{
      hasBackdrop: true,
      width: '60%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      if(result == 'new') {
        this.getPinsData();
      }
    });
  }

}
