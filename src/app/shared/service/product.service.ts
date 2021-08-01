import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { pipe, Subject } from "rxjs";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { ProductSKU } from "../model/product-sku.model";
import { Product } from "../model/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    baseUrl = "https://rajbika-store.firebaseio.com/"
    productUrl = this.baseUrl + "products"

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    fetchProducts(category: string = null) {
        const url = this.productUrl + ".json"
        return this.http.get(url).pipe(
            map((result) => {
                return Object.keys(result).map((key) => { return result[key] })
            })
        ).subscribe(products => {
            console.log(products)
        })
    }

    saveProduct(product: Product) {
        const pUrl = this.productUrl + '/' + product.id + '.json'
        return this.http.put(pUrl, product)
    }

    saveSKUCollection(productId: string, skuCollection: ProductSKU[]) {
        const pUrl = this.productUrl + '/' + productId + '/sku.json'
        return this.http.put(
            pUrl,
            skuCollection
        )
    }

    searchProduct(searchValue: string) {
        return this.http.get(
            this.productUrl + '.json'
        ).pipe(
            map((result) => {
                return Object.keys(result).map((key) => { return result[key] })
            }),
            map(products => {
                return products.filter(p => p.name.toLowerCase().includes(searchValue))
            })
        )
    }

    getProductSKU(productId: string) {
        const pUrl = this.productUrl + "/" + productId + "/sku.json"
        return this.http.get(pUrl).pipe(
            map(sku => {
                if (sku) {
                    return Object.keys(sku).map((key) => { return sku[key] })
                } else {
                    return []
                }
            })
        )
    }

    getProductSizes() {
        const url = this.baseUrl + 'product-size.json'
        return this.http.get(url)
    }


}