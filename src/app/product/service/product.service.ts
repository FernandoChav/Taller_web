import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../interface/product";
import { EntityGroup } from "../../entities/entity.group";
import { enviroment } from "../../../enviroment";
import { UrlUtil } from "../../util/url.util";
import { ObjectParameters } from "../../entities/object.parameters";
import { HttpObjectService } from "../../service/object.service";

@Injectable({
    providedIn: 'root'
})
export class ProductService implements HttpObjectService<Product> {


    private readonly baseUrl : string;
    private readonly endpointService = "product/";

    constructor(private http : HttpClient) {
        this.baseUrl = enviroment.apiUrl + this.endpointService;
    }
    update(id: number, parameters: ObjectParameters, headers_: HttpHeaders): Observable<Product> {
        throw new Error("Method not implemented.");
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
    


}