import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { FirebaseService } from '../../service/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  name: string;
  uid: string;
  isAdmin: boolean;
  email: string;
  user: User;

  constructor(
    private _firebaseService: FirebaseService,
    private router: Router
  ) { 
    this._firebaseService.getUser().subscribe(
      user => {
        if(user){
          this._firebaseService.getUserDetails(user.uid).subscribe((user: User) => { 
            this.user = user;
            this.name = this.user.displayName;
            this.email = this.user.email;
            this.isAdmin = this.user.isAdmin;
          });
          this.isLoggedIn = true;
          this.uid = user.uid;
        }else{
          this.isLoggedIn = false;
        }
      }
    );

  }

  ngOnInit(): void {
  }

  signout(){
    this._firebaseService.logout().then(() => {
  		this.router.navigate(['auth/login']);
  		this.isLoggedIn = false;
  	});
  }

}
