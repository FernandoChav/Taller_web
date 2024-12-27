import { Injectable } from "@angular/core";
import { EntityGroup } from "../../entities/entity.group";
import { Product } from "../interface/product";

@Injectable({
    providedIn: 'root'
})
export class ProductController {

    page : number = 1;
    group? : EntityGroup<Product> | null = null;
    
}