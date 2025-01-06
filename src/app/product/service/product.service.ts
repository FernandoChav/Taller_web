import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { EntityGroup } from "../../entities/entity.group";
import { enviroment } from "../../../enviroment";
import { UrlUtil } from "../../util/url.util";
import { ObjectParameters } from "../../entities/object.parameters";
import { HttpObjectService } from "../../service/object.service";
import { Product } from "../interface/product";

@Injectable({
    providedIn: 'root'
})
export class ProductService implements HttpObjectService<Product> {

    private readonly baseUrl : string;
    private readonly endpointService = "product/";

    constructor(private http : HttpClient) {
        this.baseUrl = enviroment.apiUrl + this.endpointService;
    }


    /**
     * Create a new product sending a HTTP requets
     * @param name the name 
     * @param price the price
     * @param stock the stock
     * @param type the type
     * @param image the image for sent
     * @returns a product created
     */

    post(name : string, price : string, stock : string, type : string, image : File
    ) : Observable<Product> {
        
        var url = `${this.baseUrl}create`;

        var formData = new FormData();
        formData.append("creationProduct.Ename", name);
        formData.append("image", image);
        formData.append("creationProduct.Price",  price.toString());
        formData.append("creationProduct.Stock", stock.toString());
        formData.append("creationProduct.ProductType", type.toString());

        console.log(formData);

        return this.http.post<Product>(url, formData);

    }

    /**
     * Update the product from the next parameters
     * @param id the id product for update
     * @param name the name, can be optional
     * @param price the price, can be optional
     * @param stock the stock, can be optional
     * @param type the type, can be optional
     * @param image the image, can be optional
     * @returns 
     */

    updatePost(id : number,
        name : string, price : string, stock : string, type : number, image : File | null) : Observable<Product> {
        var url = `${this.baseUrl}update/${id}`;

        var formData = new FormData();

        formData.append("name", name);

        if(image !== null){
            formData.append("image", image);
        }

        formData.append("price",  price.toString());
        formData.append("stock", stock.toString());
        formData.append("productType", type.toString());

        console.log(formData.get("name"));
        return this.http.put<Product>(url, formData);
    }

    create(entity: Product): Observable<Product> {
        var url = `${this.baseUrl}create`;
        return this.http.post<Product>(url, entity);
    }
    
    update(id: number, parameters: ObjectParameters): Observable<Product> {
        if(parameters == null){
            return EMPTY;
        }

        var url = `${this.baseUrl}update/${id}`;

        var dictionary = parameters.getParameters();
        var body = Object.fromEntries(dictionary);
        return this.http.put<Product>(url, body);
    }

    all(): Observable<EntityGroup<Product>> {
            return this.http.get<EntityGroup<Product>>(`${this.baseUrl}all`);
    }
    
    query(parameters: ObjectParameters): Observable<EntityGroup<Product>> {
        var query = UrlUtil.
        buildUrl(parameters);

        var url = `${this.baseUrl}all${query}`;
        return this.http.get<EntityGroup<Product>>(url);
    }
    
    delete(id: number): Observable<Product> {
        var url = `${this.baseUrl}delete/${id}`;
        return this.http.delete<Product>(url);
    }

}