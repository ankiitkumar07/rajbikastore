import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginWithPhoneComponent } from "./components/login-with-phone/login-with-phone.component";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        // Using LoginWithPhoneComponent to login/Signup users using phone numbers!!
        // component: LoginComponent
        component: LoginWithPhoneComponent
    },
    // {
    //     path: 'register',
    //     component: RegisterComponent
    // }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule { }