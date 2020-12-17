import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { DatabaseReference } from '@angular/fire/database/interfaces';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators'
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

  async login(email: string, password: string) {
    await this.fauth.signInWithEmailAndPassword(email, password).then(() => {
      //  this.db.object('user/' + )
    });
  }

  async logout() {
    await this.fauth.signOut();
  }

  async register(email: string, password: string,) {
    await this.fauth.createUserWithEmailAndPassword(email, password).catch(function (error) {
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

  createUser(user: User, uid: string) {
    this.db.database.ref('users').child(uid).set(user);
  }

  getUser(): Observable<any> {
    return this.fauth.authState;
  }

  getUserDetails(uid: string): Observable<any> {
    return this.db.object('users/' + uid).valueChanges();
  }

  isAdmin(uid: string): Observable<any> {
    return this.db.object('users/' + uid + '/isAdmin').valueChanges();
  }

  getAddress(uid: string): Observable<any> {
    return this.db.list('users/' + uid + '/address').valueChanges();
  }

  saveUserAddress(address: Address, uid: string) {
    return this.db.database.ref('users/' + uid + '/address').child(address.name).set(address);
  }

  getProducts(): Observable<any> {
    return this.db.list('products').valueChanges();
  }

  getProductSize(){
    return this.db.list('product-size').snapshotChanges().pipe(map((sizes: any[]) => sizes.map(size => ({
      name: size.key, ...size.payload.val()
    }))))
  }

  onAddNewProduct(product: Product) {
    this.db.database.ref('products').child(product.id).set(product);
  }

  saveProduct(product: Product) {
    return this.db.database.ref('products/').child(product.id).set(product);
  }

  getProduct(id: string): Observable<any> {
    return this.db.object('products/' + id).valueChanges();
  }

  getCartItems(id: string) {
    return this.db.list('cart/' + id).valueChanges();
  }

  //Auth Methods

  getUserList(){
    return this.db.list('users').snapshotChanges().pipe(map((users: any[]) => users.map(user => ({ id: user.key, ...user.payload.val() }))));
  }

  getAdminList() {
    return this.db.list('admins').snapshotChanges().pipe(map((admins: any[]) => admins.map(admin => ({ id: admin.key, ...admin.payload.val() }))));
  }

  setAdmin(uid: string) {
    return this.db.database.ref('admins').child(uid).set('true');
  }

  getSuperAdminList() {
    return this.db.list('super-admins').valueChanges();
  }

  getInventoryManagerList() {
    return this.db.list('inventory-managers').valueChanges();
  }

  //Shop filter methods
  getCategories(){
    return this.db.list('product-category').snapshotChanges().pipe(map((categories: any[]) => categories.map(
      category => ({
        id: category.key, 
        data: category.payload.val()
      })
    )))
  }

  getCategoryItem(category: string){
    console.log(category)
    return this.db.list('product-category/' + category).valueChanges()
  }

}
