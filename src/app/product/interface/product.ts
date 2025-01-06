/**
 *  This is a model entity that represent a product
 */

export interface Product {

    /**
     * The product id
     */

    id : number;

    /**
     * The product name
     */

    name : string;

    /**
     * The product type
     */

    productType : number;

    /**
     * The price, this value can't be negative
     */

    price : number;

    /**
     * The stock, this value can't be negative 
     */

    stock : number;

    /**
     * The image url 
     */

    imageUrl : string;

}