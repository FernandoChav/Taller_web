import { Observable, EMPTY } from "rxjs";
import { EntityGroup } from "../../entities/entity.group";
import { ObjectParameters } from "../../entities/object.parameters";
import { HttpObjectService } from "../../service/object.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { enviroment } from "../../../enviroment";
import { UrlUtil } from "../../util/url.util";
import { User } from "../interface/user";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserService implements HttpObjectService<User> {

    private readonly baseUrl : string;
    private readonly endpointService = "user/";

    constructor(private http : HttpClient){
        this.baseUrl = enviroment.apiUrl + this.endpointService;
    }
    create(entity: User, headers? : HttpHeaders): Observable<User> {
        throw new Error("Method not implemented.");
    }
    
    delete(id: number): Observable<User> {
        throw new Error("Method not implemented.");
    }
    
    public all(headers?: HttpHeaders): Observable<EntityGroup<User>> {
        if(headers == null) {
            return EMPTY;
        }
        return this.http.get<EntityGroup<User>>(`${this.baseUrl}all`, { headers : headers});
    }

    public query(parameters: ObjectParameters, headers?: HttpHeaders): Observable<EntityGroup<User>> {
        if(headers == null){
            return EMPTY;
        }

        var query = UrlUtil.
                buildUrl(parameters);
        var url = `${this.baseUrl}all${query}`;
        return this.http.get<EntityGroup<User>>(url, {headers : headers});
    }

    public update(id: number, parameters: ObjectParameters, headers: HttpHeaders): Observable<User> {
        if(parameters == null){
            return EMPTY;
        }

        var url = `${this.baseUrl}update/${id}`;

        var dictionary = parameters.getParameters();
        var body = Object.fromEntries(dictionary);

        console.log(url);
        console.log(body);
        return this.http.put<User>(url, body, {headers : headers})
    }

}