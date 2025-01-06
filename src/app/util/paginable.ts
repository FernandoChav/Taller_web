/**
 * This interface represent a way for paginate elements
 */

export interface Paginable {

    /**
     * The number page read now
     */

    page : number;

    /**
     * Reset the page to first page, mostrly 1 page
     */

    resetPage() : void;

}