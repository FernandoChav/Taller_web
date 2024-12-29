export class ObjectParameters {

    private readonly parameters : Map<string, string>;

    constructor() {
        this.parameters = new Map();
    }

    public add(key : string, value : string) : ObjectParameters {
        this.parameters.set(key, value);
        return this;
    }

    public page(page : number) : ObjectParameters {
        this.add("page", page.toString());
        return this;
    }

    public get(key : string) : string | undefined {
        return this.parameters.get(key);
    }
 
    public getParameters() : Map<string, string> {
        return this.parameters;
    }

    public static newParameters() : ObjectParameters {
        return new ObjectParameters();
    }

}