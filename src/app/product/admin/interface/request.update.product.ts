import { Injectable } from "@angular/core";
import { Product } from "../../interface/product";

/**
 * This is a intermediate model that contains a product for edit
 */

@Injectable({
    providedIn: 'root'
})
export class RequestUpdateProduct {

    /**
     * The product for edit
     */

    public product : Product | undefined;

}