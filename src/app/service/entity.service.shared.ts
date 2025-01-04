import { EntityGroup } from "../entities/entity.group";
import { ObjectParameters } from "../entities/object.parameters";

export interface EntityServiceShared<T> {

    group? : EntityGroup<T> | null;

    /**
     * Define a form for retry a set parameters from the service 
     * for build http requets 
     * 
     * This return a object parameter object that wrap the values 
     * 
     */

    parameters() : ObjectParameters;

}