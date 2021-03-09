import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  userPhotoUrl: string
  userDisplayName: string

  constructor(
    private _firebaseService: FirebaseService,
    private router: Router
  ) {
    this._firebaseService.getUser().subscribe(user => {
      if(user){
        let uid = user.uid
        this._firebaseService.getUserImage(uid).subscribe(url => {
          this.userPhotoUrl = url
        })
        this._firebaseService.getUserName(uid).subscribe(name => {
          this.userDisplayName = this.getFirstName(name)
        })
      }else{
        this.router.navigate(['auth/login'])
      }
    })
   }

  ngOnInit(): void {
  }

  getFirstName(name: string): string{
    return name.split(' ')[0]
  }

}
