import { Observable } from "rxjs";
import { EntityGroup } from "../entities/entity.group";
import { ObjectParameters } from "../entities/object.parameters";

export interface ObjectService<T> {

    all() : Observable<EntityGroup<T>>

    query(parameters : ObjectParameters) : Observable<EntityGroup<T>>

}