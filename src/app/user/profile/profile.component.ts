import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  loading: boolean = true;

  constructor(
    private _firebaseService: FirebaseService,
    private router: Router
  ) { 
    this._firebaseService.getUser().subscribe(user => {
      if(user){
        this._firebaseService.getUserDetails(user.uid).subscribe((user: User) => {
          this.user = user;
          console.log(this.user);
          this.loading = false;
        })
      }else{
        this.router.navigate(['auth/login']);
      }
    })
  }

  ngOnInit(): void {
  }

}
