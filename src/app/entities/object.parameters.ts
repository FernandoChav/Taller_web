/**
 * This is a class used for represent many quantity parameters
 */

export class ObjectParameters {

    /**
     * This map contains the parameters
     */

    private readonly parameters : Map<string, string>;

    constructor() {
        this.parameters = new Map();
    }

    /**
     * Add a new key and value as parameter
     * @param key the key 
     * @param value the value
     * @returns the same instance
     */

    public add(key : string, value : string) : ObjectParameters {
        this.parameters.set(key, value);
        return this;
    }

    /**
     * Insert a parameter as key page
     * @param page the quantity page
     * @returns the same instance
     */

    public page(page : number) : ObjectParameters {
        this.add("page", page.toString());
        return this;
    }

    /**
     * Get a parameter from her key
     * @param key the key value
     * @returns the parameter obtained
     */

    public get(key : string) : string | undefined {
        return this.parameters.get(key);
    }
 
    /**
     * Get all parameters
     * @returns all parameters
     */

    public getParameters() : Map<string, string> {
        return this.parameters;
    }

    /**
     * This is a static factory method for create a new instance from ObjectParameters
     * @returns 
     */

    public static newParameters() : ObjectParameters {
        return new ObjectParameters();
    }

}