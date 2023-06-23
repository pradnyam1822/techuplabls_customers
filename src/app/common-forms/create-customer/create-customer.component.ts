import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  name: FormControl = new FormControl("",Validators.required);
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);

  public items: string[] = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
        'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
        'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
        'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
        'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
        'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
        'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
        'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
        'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
        'Zagreb', 'Zaragoza', 'Łódź'];
 
     selectRegion = new FormControl('',Validators.required);
     selectCountry = new FormControl('',Validators.required);
    isSelectCountryDisabled = true;
 
    // private _ngxDefaultTimeout;
    private _ngxDefaultInterval:any;
    private _ngxDefault:any;

    url: string = '/assets/countries.json';

  regionData:any = [];
  regionArr:any = [];
  countryArr:any = [];
  isSubmitDisabled = true;

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<CreateCustomerComponent>,) { 
  //   this._ngxDefaultTimeout = setTimeout(() => {
  //     this._ngxDefaultInterval = setInterval(() => {
  //         const idx = Math.floor(Math.random() * (this.items.length - 1));
  //         this._ngxDefault = this.items[idx];
  //         // console.log('new default value = ', this._ngxDefault);
  //     }, 2000);
  // }, 2000);
  }

  public ngOnDestroy(): void {
    // clearTimeout(this._ngxDefaultTimeout);
    // clearInterval(this._ngxDefaultInterval);
}

public doNgxDefault(): any {
    return this._ngxDefault;
}

selectedRegion(value:any) {
  this.countryArr = [];
  this.isSelectCountryDisabled = true;
  this.countryArr = this.regionData.filter((a:any)=> a.region == value[0].value)[0]?.countries;
  this.isSelectCountryDisabled = this.countryArr?.length > 0 ? false : true;
}

selectedCountry(value:any) {
  // console.log(value[0].value);
}

getRegionCountryData() {
  this.http.get(this.url).subscribe(
    (resp) => {
    let tempResponse:any = resp;
    let regionData:any = Object.values(tempResponse.data).reduce((x:any, y:any) => {
      (x[y.region] = x[y.region] || []).push(y.country);
      return x;
    }, {});;
    //  console.log(regionData);
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
  var a = localStorage.getItem('pinsData');
  // console.log(a);
  custData = (a != null && a != undefined) ? JSON.parse(a) : [];
  if(custData.length > 0) {
  var isDuplicateCustomer = custData.filter((a:any)=> a.title == this.name.value).length;
  if(isDuplicateCustomer == 0) {
    var obj = {title:'', email:'', region:'', country:''};
    obj.title = this.name.value;
    obj.email = this.email.value;
    obj.region = this.selectRegion.value ? this.selectRegion.value : '';
    obj.country = this.selectCountry.value ? this.selectCountry.value : '';
    custData.push(obj);
    localStorage.setItem('pinsData', JSON.stringify(custData));
    this.dialogRef.close('new');
  }
  else {
    window.alert('Customer with this title already exists. Please try another title.');
  }
  }
  
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
