import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { DatabaseReference } from '@angular/fire/database/interfaces';
import { Observable, Subject } from 'rxjs';
import { Product } from '../model/product.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../model/user';
import { Address } from '../model/address.model';

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

   async register(email: string, password: string, ){
     await this.fauth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
   }

   createUser(user: User, uid: string){
     this.db.database.ref('users').child(uid).set(user);
   }

   getUser(): Observable<any>{
    return this.fauth.authState;
   }

   getUserDetails(uid: string) : Observable<any>{
    return this.db.object('users/' + uid).valueChanges();
   }

  isAdmin(uid: string): Observable<any>{
    return this.db.object('users/' + uid + '/isAdmin').valueChanges();
  }

  getAddress(uid: string): Observable<any>{
  	return this.db.list('users/' + uid + '/address').valueChanges();
  }

  saveUserAddress(address: Address, uid: string){
    return this.db.database.ref('users/' + uid + '/address').child(address.name).set(address);
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

   getCartItems(id: string){
     return this.db.list('cart/' + id).valueChanges();
   }
}
