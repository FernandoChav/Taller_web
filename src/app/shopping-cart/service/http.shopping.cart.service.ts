import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CartItem } from "../interface/shopping.cart";
import { ShoppingCartService } from "./shopping.cart.service";
import { Observable } from "rxjs";
import { enviroment } from "../../../enviroment";
import { WrapperInt } from "../interface/wrapper.int";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
}) 
export class HttpShoppingCartService implements ShoppingCartService {

    private readonly baseUrl : string;
    private readonly endpointService = "api/";

    constructor(private httpClient : HttpClient) {
        this.baseUrl = enviroment.apiUrl + this.endpointService;
    }

    get(): Observable<CartItem[]> {
        console.log(`${this.baseUrl}get`);
        return this.httpClient.get<CartItem[]>(`${this.baseUrl}get`);
    }

    addToCart(item: CartItem): Observable<CartItem[]> {
        console.log(`${this.baseUrl}add`)
        
        console.log(document.cookie);
        return this.httpClient.post<CartItem[]>(
            `${this.baseUrl}add`,
            item,
            {withCredentials : true, headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })}
        );
    }

    remove(productId: CartItem): Observable<CartItem[]> {
        var url = `${this.baseUrl}delete/${productId}`;
        return this.httpClient.delete<CartItem[]>(url);
    }

    update(productId: number, quantity: number): Observable<CartItem[]> {
        var url = `${this.baseUrl}update/${productId}`;
        var wrapperInt = new WrapperInt();
        wrapperInt.value = quantity;

        return this.httpClient.put<CartItem[]>(url,
                wrapperInt
        );
    }


}