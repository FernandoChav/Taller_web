import { HttpHeaders } from "@angular/common/http";

/**
 * A set unilty for build http requets
 */

export class HttpHeaderUtil {

    private constructor() {}

    /**
     * Return a header with content type json and assign bearer token
     * @param auth_token the token
     * @returns  a header with this information
     */

    public static asBearToken(auth_token : string) : HttpHeaders {
        return new HttpHeaders(
            {
                'Content-Type': 'application/json',
             'Authorization': `Bearer ${auth_token}`
         }
        );
    }

}