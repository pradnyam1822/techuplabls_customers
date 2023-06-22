import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { countryUrl } from 'src/app/global/global-urls';
// const cors=require('cors');
const headerDict = {
  'Access-Control-Allow-Origin': '*',
}

const requestOptions = {                                                                                                                                                                                 
  headers: new HttpHeaders(headerDict), 
};

// const express = require('express')
const cors = require('cors')
// const app = express()
// const corsOptions = {
//   origin: countryUrl,
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {

  customerForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  });
  

  constructor(private http: HttpClient) { }

  getRegionCountryData() {

    // app.use(cors());
    // app.get(countryUrl, function (req:any, res:any, next:any) {
    //   console.log(res);
    // })
    
    // headers.append('Access-Control-Allow-Origin', '*');
    this.http.get(countryUrl, requestOptions).subscribe(
      (resp) => {
       console.log(resp);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  ngOnInit(): void {
    this.getRegionCountryData();
  }

}
