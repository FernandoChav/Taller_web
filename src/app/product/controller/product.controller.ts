import { Injectable } from "@angular/core";
import { EntityGroup } from "../../entities/entity.group";
import { Product } from "../interface/product";
import { ObjectParameters } from "../../entities/object.parameters";
import { Paginable } from "../../util/paginable";
import { EntityServiceShared } from "../../service/entity.service.shared";
import { ProductService } from "../service/product.service";

@Injectable({
    providedIn: 'root'
})
export class ProductController implements EntityServiceShared<Product> {

    page : number = 1;
    searchedProduct : string = "";
    group? : EntityGroup<Product> | null = null;
    isOrderingByPrice : boolean = false;
    isAscending : boolean = false;
    
    public resetPage() : void {
        this.page = 1;
    }

    public parameters() : ObjectParameters {
        return ObjectParameters.newParameters()
        .page(this.page)
        .add("isOrderingByPrice", this.isOrderingByPrice + "")
        .add("isAscending", this.isAscending + "")
        .add("filteringByNameProduct", this.searchedProduct);
    }

}