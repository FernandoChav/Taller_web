import { Observable } from "rxjs";
import { CartItem } from "../interface/shopping.cart";

export interface ShoppingCartService {

    get() : Observable<CartItem[]>;

    addToCart(item : CartItem) : Observable<CartItem[]>;

    remove(productId : CartItem) : Observable<CartItem[]>;

    update(productId : number, quantity : number) : Observable<CartItem[]>; 

}