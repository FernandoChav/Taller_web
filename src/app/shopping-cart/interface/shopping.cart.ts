/**
 * This is a entity that represent a cart item from shopping cart
 */

export interface CartItem {

    /**
     * The product id 
     */

    productId : number;

    /**
     * The product name
     */

    productName : string;

    /**
     * The quantity for buy, this value can't be negative
     */

    quantity : number;

    /**
     * The price for element, this value can't be negative
     */

    price : number;

}