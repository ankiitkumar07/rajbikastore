import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../shared/model/user";
import { UserMetaData } from "../shared/model/user-meta-data.model";
import { UserProfileData } from "../shared/model/user-profile-data.model";

@Injectable({
    providedIn: 'root'
})
export class UserSerivce {

    userPhoneListURL = environment.fURL + 'user-phone-list/'
    userURL = environment.fURL + 'users/'

    constructor( 
        private http: HttpClient,
        private router: Router
    ) {}

    saveUserData(user: User, profile: UserProfileData){
        const url = this.userURL + user.uid + '.json'
        console.log("save user has been called with - " + url)
        return this.http.patch(url , {
            email: user.email,
            uid: user.uid, 
            token: user.token, 
            tokenExpirationDate: user.tokenExpirationDate,
            profile: profile,
            metadata: new UserMetaData()
        }).pipe(
            catchError(this.handleErrors),
            map((user: User) => {
                console.log(user)
                this.router.navigate(['/user/profile'])
                return user
            })
        )
    }

    saveUserPhone(phone: number, uid: string){
        const url = this.userURL + phone + '.json'
    }
    
    validateUserPhoneExist(phone: number){
        const url = this.userPhoneListURL + '.json'
        return this.http.get<{key: string, value: string}[]>(url).pipe(
            map(res => {
                return Object.keys(res)
            }),
            map(res => {
                return res.includes(phone.toString())
            })
        )
    }

    getUserData(uid: string) {
        const url = this.userURL + uid + '.json'
        return this.http.get<User>(url)
    }

    createProfile(uid: string, displayName: string, phoneNum: string){
        const url = this.userURL + uid + '/profile.json'
        this.http.put(url, {})   
    }

    handleErrors(errorRes: HttpErrorResponse) {
        let errorMessage = "An unknown error occurred. Please try again!"
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }

        // switch (errorRes.error.error.message) {
        //     case 'EMAIL_EXISTS':
        //         errorMessage = "The email already exists!"
        //         break;
        //     case 'OPERATION_NOT_ALLOWED':
        //         errorMessage = "Invalid operation!"
        //         break;
        //     case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        //         errorMessage = "Too many attempts. Please try after sometime!"
        //         break;
        //     case 'EMAIL_NOT_FOUND' || 'INVALID_PASSWORD':
        //         errorMessage = "Either the email or the password is incorrect!"
        //         break;
        //     case 'USER_DISABLED':
        //         errorMessage = "The user has been disabled by the Admin. Please contact support!"
        //         break;
        // }
        return throwError(errorMessage)
    }

}