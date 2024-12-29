import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../interface/product";
import { EntityGroup } from "../../entities/entity.group";
import { enviroment } from "../../../enviroment";
import { ObjectService } from "../../service/object.service";
import { UrlUtil } from "../../util/url.util";
import { ObjectParameters } from "../../entities/object.parameters";

@Injectable({
    providedIn: 'root'
})
export class ProductService implements ObjectService<Product> {


    private readonly baseUrl : string;
    private readonly endpointService = "product/";

    constructor(private http : HttpClient) {
        this.baseUrl = enviroment.apiUrl + this.endpointService;
    }

    all(): Observable<EntityGroup<Product>> {
            return this.http.get<EntityGroup<Product>>(`0${this.baseUrl}all`);
    }
    
    query(parameters: ObjectParameters): Observable<EntityGroup<Product>> {
        var query = UrlUtil.
        buildUrl(parameters);

        var url = `${this.baseUrl}all${query}`;
        return this.http.get<EntityGroup<Product>>(url);
    }
    


}