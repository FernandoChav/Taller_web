import { Head, Observable } from "rxjs";
import { EntityGroup } from "../entities/entity.group";
import { ObjectParameters } from "../entities/object.parameters";
import { HttpHeaders } from "@angular/common/http";

export interface HttpObjectService<T> {

    create(entity : T, headers? : HttpHeaders) : Observable<T>

    all(headers? : HttpHeaders) : Observable<EntityGroup<T>>

    query(parameters : ObjectParameters,
        headers? : HttpHeaders) : Observable<EntityGroup<T>>


    update(id : number,
        parameters : ObjectParameters,
        headers_ : HttpHeaders
    ) : Observable<T>

    delete(id : number) : Observable<T>;

}