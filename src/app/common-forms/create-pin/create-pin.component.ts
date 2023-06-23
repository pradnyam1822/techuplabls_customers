import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FileUploader } from 'ng2-file-upload';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-create-pin',
  templateUrl: './create-pin.component.html',
  styleUrls: ['./create-pin.component.scss']
})
export class CreatePinComponent implements OnInit {

  name: FormControl = new FormControl("",Validators.required);
  public selectCust = new FormControl([], Validators.required);
  custArr:any = [];
  custData:any;
  private _ngxDefault:any;
  selectedPrivacy: string = '';
  privacyOptions: string[] = ['Private', 'Public'];
  isSubmitDisabled = true;
  public uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  response:string;


  constructor(public dialogRef: MatDialogRef<CreatePinComponent>) {
    this.uploader = new FileUploader({
      url: URL,
      isHTML5: true,
      disableMultipart: true, 
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item:any) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });
    this.hasBaseDropZoneOver = false;
    this.response = '';
    this.uploader.response.subscribe( res => this.response = res );
   }

   public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public doNgxDefault(): any {
    return this._ngxDefault;
  }

  selectedCust(value:any) {
    console.log(value);
    value.forEach((element:any) => {
      console.log(element.value);
    })
  }

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

  createPin() {
    var pinsData = [];
    var a = localStorage.getItem('pinsData');
    pinsData = (a != null && a != undefined) ? JSON.parse(a) : [];
    if(pinsData.length > 0) {
      // check if pin with same title exists
      var isDuplicatePin = pinsData.filter((a:any)=> a.title == this.name.value).length;
      if(isDuplicatePin == 0) {
        this.addPin(pinsData);
      }
      else {
        window.alert('Pin with this title already exists. Please try another title.');
      }
    }    
    else {
      this.addPin(pinsData);
    }
  }

  addPin(pinsData:any) {
    let selectedImage:string[] = [];
    selectedImage = this.uploader?.queue?.length > 0 ? this.uploader?.queue?.map((data:any)=> {return data.file.name}) : [];
    var obj = {title:'', collaboratory: [], image:'', privacy:''};
    obj.title = this.name.value;
    obj.collaboratory = this.selectCust.value != null ? this.selectCust.value : [];
    obj.image = selectedImage[0];
    obj.privacy = this.selectedPrivacy;
    pinsData.push(obj);
    localStorage.setItem('pinsData', JSON.stringify(pinsData));
    this.dialogRef.close('new');
    window.alert('Pin created successfully.');
  }

  getSubmitDisabled() {
    let isImageUploaded = false;
    isImageUploaded = (this.uploader?.queue?.length > 0 && 
    this.uploader?.queue?.filter((a:any)=> a.isUploaded == true).length > 0) ? true : false;
    this.isSubmitDisabled = (this.name.invalid == false && this.selectCust.value != null && this.selectCust.value.length > 0 && 
      isImageUploaded == true && this.selectedPrivacy != '') ? false : true;
    return this.isSubmitDisabled;
  }

  getCustomerData() {
    this.custData = localStorage.getItem('custData');
    if(this.custData != null && JSON.parse(this.custData).length > 0) {
      this.custArr = JSON.parse(this.custData).map((data:any)=> {return data.title});
    }
    else {
      window.alert('No Customers added. Please add customer first');
      this.dialogRef.close('cancel');
    }
  }

  ngOnInit(): void {
    this.getCustomerData();
  }

}
