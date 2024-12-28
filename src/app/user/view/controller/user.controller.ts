import { Injectable } from "@angular/core";
import { User } from "../../interface/user";
import { EntityGroup } from "../../../entities/entity.group";
import { Paginable } from "../../../util/paginable";

@Injectable({
    providedIn: 'root'
})
export class UserController implements Paginable {
    page: number = 1;

    group? : EntityGroup<User> | null = null;

    resetPage(): void {
        this.page = 0;
     }
 

}