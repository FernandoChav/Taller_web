import { Observable, EMPTY } from "rxjs";
import 'rxjs/add/observable/empty';
import { EntityGroup } from "../../entities/entity.group";
import { ObjectParameters } from "../../entities/object.parameters";
import { HttpObjectService } from "../../service/object.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { enviroment } from "../../../enviroment";
import { UrlUtil } from "../../util/url.util";

export class UserService implements HttpObjectService<User> {

    private readonly baseUrl : string;
    private readonly endpointService = "user/";

    constructor(private http : HttpClient){
        this.baseUrl = enviroment.apiUrl + this.endpointService;
    }

    all(headers?: HttpHeaders): Observable<EntityGroup<User>> {
        if(headers == null) {
            return EMPTY;
        }
        return this.http.get<EntityGroup<User>>(`${this.baseUrl}all`, { headers : headers});
    }

    query(parameters: ObjectParameters, headers?: HttpHeaders): Observable<EntityGroup<User>> {
        if(headers == null){
            return EMPTY;
        }

        var query = UrlUtil.
                buildUrl(parameters);
        var url = `${this.baseUrl}all${query}`;
        return this.http.get<EntityGroup<User>>(url, {headers : headers});
    }


}