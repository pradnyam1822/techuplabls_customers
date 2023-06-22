import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { countryUrl } from 'src/app/global/global-urls';

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
  url: string = '/assets/countries.json';
  

  constructor(private http: HttpClient) { }

  getRegionCountryData() {
    this.http.get(this.url).subscribe(
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
