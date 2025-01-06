export class TypesUtil {

    private static readonly productsAsNumber : Map<string, number> = new Map()
    .set("polera", 0)
    .set("gorro", 1)
    .set("juguetería", 2)
    .set("alimentación", 3)
    .set("libro", 4);

    private constructor() {}

    public static productTypeToNumber(productType : string) : number {
       var result = this.productsAsNumber.get(productType);
       if(result === undefined){
         return 0;
       }
       return result;
    }

}