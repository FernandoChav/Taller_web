export interface Paginable {

    page : number;

    nextPage() : void;

    previousPage()  : void;

    reset() : void;

}