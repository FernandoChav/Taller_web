import { Injectable } from "@angular/core";
import { Product } from "../../interface/product";

@Injectable({
    providedIn: 'root'
})
export class RequestUpdateProduct {

    public product : Product | undefined;

}