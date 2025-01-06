import { EntityGroup } from "../entities/entity.group";
import { ObjectParameters } from "../entities/object.parameters";

/**
 * This a is a service for shared properties between componentes
 * 
 * Example: let A,B,C components and X entity shared service, so 
 * 
 * [A] \
 * [B] --> [X]
 * [C] /
 * 
 */

export interface EntityServiceShared<T> {

    /**
     * Represent a set objects for shared between components
     */

    group? : EntityGroup<T> | null;

    /**
     * Define a form for retry a set parameters from the service 
     * for build http requets 
     * 
     * This return a object parameter object that wrap the values 
     * 
     */

    /**
     * This contains a set parameters for make a HTTP requets
     */

    parameters() : ObjectParameters;

}