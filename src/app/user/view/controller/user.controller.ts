import { Injectable } from "@angular/core";
import { User } from "../../interface/user";
import { EntityGroup } from "../../../entities/entity.group";
import { Paginable } from "../../../util/paginable";
import { ObjectParameters } from "../../../entities/object.parameters";

@Injectable({
    providedIn: 'root'
})
export class UserController implements Paginable {
    page: number = 1;
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