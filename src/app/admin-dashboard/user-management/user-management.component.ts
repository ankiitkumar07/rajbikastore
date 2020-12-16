import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  role: string = '';
  users: User[] = [];

  constructor(
    private _firebaseService: FirebaseService,
    private router: Router
  ) { 
    this._firebaseService.getUser().subscribe(user => {
      if(user){
        this._firebaseService.getUserList().subscribe((users: User[]) => {
          this.users = users;
        })
        this._firebaseService.getUserDetails(user.uid).subscribe((currentUser: User) => {
          if(currentUser.isAdmin){
            this.role = 'admin';
          }else
          if(currentUser.isSuperAdmin){
            this.role = 'super'
          }else
          if(currentUser.isInvetoryManager){
            this.role = 'manager'
          }else{
            this.router.navigate(['']);
          }
        })
      }
    })
  }

  ngOnInit(): void {
  }

  getAdmins(){
    return this.users.filter(x => x.isAdmin);
  }

  getSuperAdmins(){
    return this.users.filter(x => x.isSuperAdmin);
  }

  getInventoryManagers(){
    return this.users.filter(x => x.isInvetoryManager);
  }

  getCustomers(){
    return this.users.filter(x => !x.isAdmin && !x.isSuperAdmin && !x.isInvetoryManager);
  }

}
