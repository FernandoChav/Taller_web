import { Head, Observable } from "rxjs";
import { EntityGroup } from "../entities/entity.group";
import { ObjectParameters } from "../entities/object.parameters";
import { HttpHeaders } from "@angular/common/http";

export interface HttpObjectService<T> {

    all(headers? : HttpHeaders) : Observable<EntityGroup<T>>

    query(parameters : ObjectParameters,
        headers? : HttpHeaders) : Observable<EntityGroup<T>>

}