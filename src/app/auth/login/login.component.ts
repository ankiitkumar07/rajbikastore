import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _firebaseService: FirebaseService) {
    this._firebaseService.getUser().subscribe(user => {
      if (user !== null) {
        console.log(user.uid);
        this.router.navigate(['']);
      }
    })
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  login() {
    this._firebaseService.login(this.f.email.value, this.f.password.value).then(() => {
      this._firebaseService.getUser().subscribe(user => {
        if (user !== null) {
          this._firebaseService.isAdmin(user.uid).subscribe((isAdmin: boolean) => {
            this.router.navigate(isAdmin ? ['admin'] : ['']);
          })
        }
      })
    })
  }
}