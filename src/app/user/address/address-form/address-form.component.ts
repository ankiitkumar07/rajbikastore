import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/shared/model/address.model';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  uid: string;
  addressForm: FormGroup;
  postsArray: any = [];
  address: Address;
  submitted: false;

  constructor(
    private http: HttpClient,
    private _firebaseService: FirebaseService,
    private formBuilder: FormBuilder
  ) {
    this._firebaseService.getUser().subscribe(user => {
      if (user !== null) {
        this.uid = user.uid;
      }
    })
  }

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      name: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      pinCode: ['', Validators.required],
      postOffice: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  get f() { return this.addressForm.controls; }



  getPostOffices(pin: number) {
    const indiaPostApiUrl = "https://api.postalpincode.in/pincode/";

    const headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', 'allow');


    this.http.get(indiaPostApiUrl + pin, { observe: 'response', headers: headers }).subscribe(res => {
      this.postsArray = res.body[0].PostOffice;
      this.f.city.setValue(this.postsArray[0].District);
      this.f.state.setValue(this.postsArray[0].State);
      this.f.country.setValue(this.postsArray[0].Country);
    });
  }

  submitAddress() {
    this.address = new Address();
    this.address = this.addressForm.getRawValue();
    this._firebaseService.saveUserAddress(this.address, this.uid).then(res => {
      console.log(res, "User address saved!");
      let modal: HTMLElement = document.getElementById('addressFormID').parentElement.parentElement.nextElementSibling.children[0] as HTMLElement;
      modal.click();
    },
      err => {
        console.log(err);
      })
  }

}
