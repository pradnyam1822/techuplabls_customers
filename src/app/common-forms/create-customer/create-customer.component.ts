import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  name: FormControl = new FormControl("",Validators.required);
  email: FormControl = new FormControl("", [Validators.required, Validators.email]); 
  selectRegion = new FormControl('',Validators.required);
  selectCountry = new FormControl('',Validators.required);
  isSelectCountryDisabled = true;
 
  private _ngxDefault:any;

  url: string = '/assets/countries.json'; // to access region and countries data

  regionData:any = [];
  regionArr:any = [];
  countryArr:any = [];
  isSubmitDisabled = true;

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<CreateCustomerComponent>,) { 
 
  }

  public doNgxDefault(): any {
    return this._ngxDefault;
  }

  selectedRegion(value:any) {
    this.countryArr = [];
    this.isSelectCountryDisabled = true;
    // filter countries based on selected region
    this.countryArr = this.regionData.filter((a:any)=> a.region == value[0].value)[0]?.countries;
    this.isSelectCountryDisabled = this.countryArr?.length > 0 ? false : true;
  }

  selectedCountry(value:any) {
  }

  getRegionCountryData() {
    this.http.get(this.url).subscribe(
      (resp) => {
      let tempResponse:any = resp;
      // group countries based on region
      let regionData:any = Object.values(tempResponse.data).reduce((x:any, y:any) => {
        (x[y.region] = x[y.region] || []).push(y.country);
        return x;
      }, {});;
      let tempArr = Object.keys(regionData).map( key => {
        var obj = {region:'', countries:[]};
        obj.region = key;
        obj.countries = regionData[key];
        this.regionArr.push(key);
        this.regionData.push(obj);
      });
      },
      (error) => {
        console.log(error);
      },
    );
  }

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

  createCustomer() {
    var custData = [];
    var a = localStorage.getItem('custData');
    custData = (a != null && a != undefined) ? JSON.parse(a) : [];
    if(custData.length > 0) {
      // check if customer with same title exists
      var isDuplicateCustomer = custData.filter((a:any)=> a.title == this.name.value).length;
      if(isDuplicateCustomer == 0) {
       this.addCustomer(custData);
      }
      else {
        window.alert('Customer with this title already exists. Please try another title.');
      }
    }    
    else {
      this.addCustomer(custData);
    }
  }

  addCustomer(custData:any) {
    var obj = {title:'', email:'', region:'', country:''};
    obj.title = this.name.value;
    obj.email = this.email.value;
    obj.region = this.selectRegion.value ? this.selectRegion.value : '';
    obj.country = this.selectCountry.value ? this.selectCountry.value : '';
    custData.push(obj);
    localStorage.setItem('custData', JSON.stringify(custData));
    this.dialogRef.close('new');
    window.alert('Customer created successfully.');
  }

  getSubmitDisabled() {
    this.isSubmitDisabled = (this.name.invalid == false && this.email.invalid == false && 
      this.selectCountry.invalid == false && this.selectRegion.invalid == false) ? false : true;
    return this.isSubmitDisabled;
  }

  ngOnInit(): void {
    this.getRegionCountryData();
  }

}
