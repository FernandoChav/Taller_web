import { HttpHeaders } from "@angular/common/http";

export class HttpHeaderUtil {

    private constructor() {}

    public static asBearToken(auth_token : string) : HttpHeaders {
        return new HttpHeaders(
            {
                'Content-Type': 'application/json',
             'Authorization': `Bearer ${auth_token}`
         }
        );
    }

}