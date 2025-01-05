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

    create(entity: Product, headers? : HttpHeaders): Observable<Product> {
        var url = `${this.baseUrl}create`;
        return this.http.post<Product>(url, entity, {headers : headers});
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