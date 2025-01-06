import { Head, Observable } from "rxjs";
import { EntityGroup } from "../entities/entity.group";
import { ObjectParameters } from "../entities/object.parameters";
import { HttpHeaders } from "@angular/common/http";

/**
 * This interface represent a service that
 * create, delete, search and update elements
 * from HTTP Prtocol
 */

export interface HttpObjectService<T> {

    /**
     * Create a new entity
     * @param entity the entity for create
     */

    create(entity : T) : Observable<T>

    /**
     * Get all elements
     */

    all() : Observable<EntityGroup<T>>

    /**
     * Make a query from parameters
     * @param parameters the parameters query
     */

    query(parameters : ObjectParameters) : Observable<EntityGroup<T>>


    /**
     * Update the element 
     * @param id the id element
     * @param parameters the parameters for update
     */

    update(id : number,
        parameters : ObjectParameters
    ) : Observable<T>

    /**
     * Delete a element
     * @param id the id element for delete
     */

    delete(id : number) : Observable<T>;

}