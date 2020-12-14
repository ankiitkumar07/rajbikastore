import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  uid: string;
	loading: boolean = true;
	addresses: any = [];

  constructor(private _firebaseService: FirebaseService, private router: Router) { 
    this._firebaseService.getUser().subscribe(user => {
      if(user){
        console.log(user.uid);
        this.uid = user.uid;
        this._firebaseService.getAddress(this.uid).subscribe(addresses => {

          if(addresses !== null){
            this.addresses = addresses;
            this.loading = false;
          }else{
            this.addresses == null;
          }
        });
      }else{
        this.router.navigate(['login']);
      }
    });
  }

  ngOnInit(): void {
  }

}
