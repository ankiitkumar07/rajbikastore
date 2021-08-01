import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Store } from "@ngrx/store"
import { BehaviorSubject, Subject, throwError } from "rxjs"
import { catchError, take, tap } from "rxjs/operators"
import { environment } from "src/environments/environment"
import { User } from "../shared/model/user"
import { UserMetaData } from "../shared/model/user-meta-data.model"
import { UserProfileData } from "../shared/model/user-profile-data.model"
import * as fromApp from '../store/app.reducer'
import { UserSerivce } from "../user/user.service"
import * as AuthActions from './store/auth.actions'

interface AuthResponseData {
    idToken: string
    email: string
    refreshToken: string
    expiresIn: string
    localId: string
    registered?: boolean
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    signupEndpoint = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebase.apiKey
    loginEndPoint = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebase.apiKey

    user = new BehaviorSubject<User>(null)
    tokenExpirationTimer: any

    constructor(
        private http: HttpClient,
        private store: Store<fromApp.AppState>,
        private router: Router,
        private userService: UserSerivce
    ) { }

    createUserWithEmailAndPassword(email: string, password: string, profile: UserProfileData) {
        return this.http.post<AuthResponseData>(this.signupEndpoint, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleAuthErrors),
            tap(resData => {
                console.log("User has been created. We are in AuthService")
                this.handleAuthentication(resData, profile)
            })
        )
    }

    loginUserWithEmailAndPassword(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.loginEndPoint, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleAuthErrors),
            tap(resData => {
                this.handleAuthentication(resData)
            })
        )
    }

    logout() {
        this.user.next(null)
        this.router.navigate(['auth/login'])
        localStorage.removeItem('userData')

        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null
    }

    autoLogin() {
        const loadedUser: {
            email: string,
            uid: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'))
        if (!loadedUser) {
            // this is causing the app to redirect to login page when app loads and no user is logged in 
            // this.router.navigate(['auth/login'])
            return
        }
        const user = new User(loadedUser.email, loadedUser.uid, loadedUser._token, new Date(loadedUser._tokenExpirationDate))
        if (user.token) {
            this.userService.getUserData(loadedUser.uid).pipe(take(1)).subscribe(
                newUser => {
                    user.profile = newUser.profile
                    user.metadata = newUser.metadata
                    user.addresses = newUser.addresses || []
                    user.cartItems = newUser.cartItems || []
                    user.wishlistItems = newUser.wishlistItems || []
                    this.user.next(newUser)
                }
            )
            // this.user.next(user)
            const expirationDuration = new Date(loadedUser._tokenExpirationDate).getTime() - new Date().getTime()
            this.autoLogout(expirationDuration * 1000)
        } else {
            this.router.navigate(['auth/login'])
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout()
        }, expirationDuration)
    }

    handleAuthentication(data: AuthResponseData, profile?: UserProfileData) {
        const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000)
        const user = new User(data.email, data.localId, data.idToken, expirationDate)
        localStorage.setItem('userData', JSON.stringify(user))
        this.user.next(user)
        if (!data.registered) {
            this.userService.saveUserData(user, profile).pipe(take(1)).subscribe(
                (user: User) => {
                    this.user.next(user)
                }
            )
        } else {
            this.userService.getUserData(data.localId).pipe(take(1)).subscribe(
                user => {
                    const newUser = new User(user.email, user.uid, data.idToken, expirationDate, user.profile, user.metadata, user.addresses || [], user.cartItems || [], user.wishlistItems || [])
                    this.router.navigate(['/user/profile'])
                    this.user.next(newUser)
                }
            )
        }
        this.autoLogout(+data.expiresIn * 1000)
        // this.store.dispatch(
        //     new AuthActions.Login({email: email, userId: userId, token: token, expirationDate: expirationDate})
        // )
    }

    handleAuthErrors(errorRes: HttpErrorResponse) {
        let errorMessage = "An unknown error occurred. Please try again!"
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "The email already exists!"
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = "Invalid operation!"
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = "Too many attempts. Please try after sometime!"
                break;
            case 'EMAIL_NOT_FOUND' || 'INVALID_PASSWORD':
                errorMessage = "Either the email or the password is incorrect!"
                break;
            case 'USER_DISABLED':
                errorMessage = "The user has been disabled by the Admin. Please contact support!"
                break;
        }
        return throwError(errorMessage)
    }
}