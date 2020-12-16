import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _firebaseService: FirebaseService, 
    public router: Router) { 
      this._firebaseService.getUser().subscribe(user => {
        if( user == null ){
          this.router.navigate(['auth/login']);
        }else{
          this._firebaseService.isAdmin(user.uid).subscribe((isAdmin: boolean) => {
            this.router.navigate(isAdmin ? ['admin'] : [''])
          });
        }
      });
    }

  ngOnInit(): void {
  }

}
