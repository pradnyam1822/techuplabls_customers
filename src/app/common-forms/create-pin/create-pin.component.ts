import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-pin',
  templateUrl: './create-pin.component.html',
  styleUrls: ['./create-pin.component.scss']
})
export class CreatePinComponent implements OnInit {

  public selectCust = new FormControl();
  custArr:any = ['customer 1', 'customer 2', 'customer 3', 'customer 4', 'customer 5', 'customer 6'];
  private _ngxDefault:any;

  constructor() { }

  public doNgxDefault(): any {
    return this._ngxDefault;
  }

  selectedCust(value:any) {
    console.log(value);
    value.forEach((element:any) => {
      console.log(element.value);
    })
  }

  ngOnInit(): void {
  }

}
