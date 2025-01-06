import { Injectable } from "@angular/core";
import { EntityGroup } from "../../../entities/entity.group";
import { ObjectParameters } from "../../../entities/object.parameters";
import { EntityServiceSharedPaginable } from "../../../service/entity.service.shared.paginable";
import { Product } from "../../interface/product";

/**
 * his is a service for shared properties between components 
 */

@Injectable({
    providedIn: 'root'
})
export class AdminProductServiceShared implements EntityServiceSharedPaginable<Product> {

    page: number = 1;

    /**
     * The name product for search
     */

    searchedProduct : string = "";

    resetPage(): void {
        this.page = 1;
    }

    group?: EntityGroup<Product> | null | undefined;

    parameters(): ObjectParameters {
        return ObjectParameters.newParameters()
        .page(this.page)
        .add("filteringByNameProduct", this.searchedProduct);
    }


}