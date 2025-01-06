import { Observable, EMPTY } from "rxjs";
import { EntityGroup } from "../../entities/entity.group";
import { ObjectParameters } from "../../entities/object.parameters";
import { HttpObjectService } from "../../service/object.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { enviroment } from "../../../enviroment";
import { UrlUtil } from "../../util/url.util";
import { User } from "../interface/user";
import { Injectable } from "@angular/core";

/**
 * This is a implementatrion from http object service for handle user
 */

@Injectable({
    providedIn: 'root'
})
export class UserService implements HttpObjectService<User> {

    /**
     * The base url 
     */

    private readonly baseUrl : string;

    /**
     * The endpoint for access
     */

    private readonly endpointService = "user/";

    constructor(private http : HttpClient){
        this.baseUrl = enviroment.apiUrl + this.endpointService;
    }

    /**
     * Send a HTTP requets for create a user
     * @param entity the user
     * @param headers an optionals headers
     */

    create(entity: User, headers? : HttpHeaders): Observable<User> {
        throw new Error("Method not implemented.");
    }
    
    /**
     * Sennd a HTTP requets for delete a user 
     * @param id the id for delete 
     */

    delete(id: number): Observable<User> {
        throw new Error("Method not implemented.");
    }
    
    /**
     * Get all user
     * @returns a set users 
     */

    public all(): Observable<EntityGroup<User>> {
        return this.http.get<EntityGroup<User>>(`${this.baseUrl}all`);
    }

    /**
     * Make a query based a parameters
     * @param parameters the parameters
     * @returns a set users searched
     */

    public query(parameters: ObjectParameters): Observable<EntityGroup<User>> {
        var query = UrlUtil.
                buildUrl(parameters);
        var url = `${this.baseUrl}all${query}`;
        return this.http.get<EntityGroup<User>>(url);
    }

    /**
     * Update a user 
     * @param id the user id for update
     * @param parameters the parameters that will updated 
     * @returns 
     */

    public update(id: number, parameters: ObjectParameters): Observable<User> {
        if(parameters == null){
            return EMPTY;
        }

        var url = `${this.baseUrl}update/${id}`;

        var dictionary = parameters.getParameters();
        var body = Object.fromEntries(dictionary);

        console.log(url);
        console.log(body);
        return this.http.put<User>(url, body)
    }

}