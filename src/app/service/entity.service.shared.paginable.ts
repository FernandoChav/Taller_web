import { EntityServiceShared } from "./entity.service.shared";

/**
 * This interface represent a way for paginate elements for services shared
 */


export interface EntityServiceSharedPaginable<T> extends Partial<EntityServiceShared<T>> {


    /**
     * The number page read now
     */

    page : number;


    /**
     * Reset the page to first page, mostrly 1 page
     */

    resetPage() : void;
}