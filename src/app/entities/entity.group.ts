/**
 * This is a model that represent a set entities
 */

export interface EntityGroup<T> {

    /**
     * The set entities
     */

    entities : T[];

    /**
     * A set properties from entities, for example, the page
     */

    metadata : Map<string, string>;

}