import { EntityServiceShared } from "./entity.service.shared";

export interface EntityServiceSharedPaginable<T> extends Partial<EntityServiceShared<T>> {
    page : number;

    resetPage() : void;
}