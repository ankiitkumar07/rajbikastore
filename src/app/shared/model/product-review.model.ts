import { THIS_EXPR } from "@angular/compiler/src/output/output_ast"

export class ProductReview {
    id: string
    productId: string
    userId: string
    userName: string
    userEmail: string
    body: string
    rating: number = 0
    createdAt: number

    constructor(productId: string, userId: string, userName: string, userEmail: string, body: string, rating?: number){
        this.id = this.getId()
        this.productId = productId
        this.userId = userId
        this.userName = userName
        this.userEmail = userEmail
        this.body = body
        this.rating = rating
        this.createdAt = Date.now()
    }

    private getId(): string{
        var result = '';
        var char =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = char.length;
          for ( var i = 0; i < 8; i++ ) {
            result += char.charAt(Math.floor(Math.random() * charactersLength));
          }
        return result;
      }
}
