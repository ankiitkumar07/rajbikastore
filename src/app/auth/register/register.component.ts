import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  loading: boolean = false;
  registerForm: FormGroup;
  submitted = false;
  returnUrl: string;

  constructor(
    private _firebaseService: FirebaseService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  get f(){
    return this.registerForm.controls;
  }

  register(){
    this._firebaseService.register(this.f.email.value, this.f.password.value).then(() => {
      this._firebaseService.getUser().subscribe(user => {
        let uid = user.uid;
        let newUser: User = new User();
        newUser.displayName = this.f.name.value;
        newUser.email = user.email;
        newUser.phoneNum = this.f.phone.value;
        this._firebaseService.createUser(newUser, uid);
      })
    });
  }

}
