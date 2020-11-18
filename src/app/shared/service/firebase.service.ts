import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { DatabaseReference } from '@angular/fire/database/interfaces';
import { Observable, Subject } from 'rxjs';
import { Product } from '../model/product';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private user: User;
  private currentUser;


  constructor(
    private db: AngularFireDatabase, 
    private http: HttpClient,
    private fauth: AngularFireAuth) {
   }

   async login(email: string, password: string){
     await this.fauth.signInWithEmailAndPassword(email, password).then(() => {
      //  this.db.object('user/' + )
     });
   }

   async logout(){
     await this.fauth.signOut();
   }

  //  getCurrentUserDisplayName(): string{
  //    let name = '';
  //    this.fauth.authState.subscribe(user => {name = user.displayName});
  //    return name;
  //  }

  //  getCurrentUserEmail(): string{
  //    let email = '';
  //    this.fauth.authState.subscribe(user => { email = user.email; console.log(email) });
  //    return email;
  //  }

   getUser(): Observable<any>{
    return this.fauth.authState;
   }

  //  getUserC(): Observable<any>{
  //   this.user = this.onAuthStateChange().then(user => {
  //     return user;
  //   })
  //  }

   getUserDetails(uid: string) : Observable<any>{
    return this.db.object('users/' + uid).valueChanges();
   }

   getProducts(): Observable<any>{
     return this.db.list('products').valueChanges();
   }

   onAddNewProduct(product: Product){
     this.db.database.ref('products').child(product.id).set(product);
   }

   saveProduct(product: Product){
    return this.db.database.ref('products/').child(product.id).set(product);
   }

   getProduct(id: string): Observable<any> {
    return this.db.object('products/' + id).valueChanges();
   }
}
