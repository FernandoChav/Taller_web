import { Observable } from "rxjs";
import { CartItem } from "../interface/shopping.cart";

/**
 * This is a service for handle a virtual shoppping cart
 */

export interface ShoppingCartService {

    /**
     * Get all cart item
     */

    get() : Observable<CartItem[]>;

    /**
     * Add a item to cart
     * @param item the item for add
     */

    addToCart(item : CartItem) : Observable<CartItem[]>;

    /**
     * Remove a item to cart
     * @param productId the product id
     */

    remove(productId : CartItem) : Observable<CartItem[]>;

    /**
     * Update the quantity about a product
     * @param productId the product id
     * @param quantity the integer quantity
     */

    update(productId : number, quantity : number) : Observable<CartItem[]>; 

}