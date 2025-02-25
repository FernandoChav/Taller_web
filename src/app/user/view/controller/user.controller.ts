import { Injectable } from "@angular/core";
import { User } from "../../interface/user";
import { EntityGroup } from "../../../entities/entity.group";
import { ObjectParameters } from "../../../entities/object.parameters";
import { EntityServiceSharedPaginable } from "../../../service/entity.service.shared.paginable";

/**
 * This is a controller-service for shared properties about user
 */

@Injectable({
    providedIn: 'root'
})
export class UserController implements EntityServiceSharedPaginable<User> {


    page: number = 1;

    /**
     * Contains the search name 
     */

    searchByName : string = "";

    group? : EntityGroup<User> | null = null;

    resetPage(): void {
        this.page = 1;
     }
 
     public parameters() : ObjectParameters {
        var parameters = ObjectParameters.newParameters()
        .page(this.page);

        if(this.searchByName !== ""){
            parameters = parameters.add("searchByName", this.searchByName);
        }
        return parameters;
     }

}