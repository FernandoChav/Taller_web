import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { ResponseAPI } from '../Interfaces/ResponseAPI';
import { firstValueFrom } from 'rxjs';
import { enviroment } from '../../../enviroment';

/**
 * This is a service for handle authentication requets
 */

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedService {


  /**
   * The base url for make the http requests
   */
  private baseUrl = '';

  /**
   * The HTTP Handler
   */

  private http = inject(HttpClient);

  constructor() { 
    this.baseUrl = enviroment.apiUrl;
  }

  /**
   * Make a authentication requets using http 
   * @param form a set information for make the authenticaiton
   * @returns  a response about if the authentication is succesful 
   */

  async login(form : any): Promise<ResponseAPI> {
    try {
      const response = await  firstValueFrom(this.http.post<ResponseAPI>(`${this.baseUrl}api/authenticate`, form));
      return Promise.resolve(response);
    }
    catch (error) {
      return Promise.reject(error);
    }
    
  }

  /**
   * Register a new user from data
   * @param form the data for register
   * @returns a boolean if registered sucessful or no
   */

  async register(form: any): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.baseUrl}/api/register`, form, { responseType: 'text' })
      );
      return response === 'OK'; // Devuelve true si la respuesta es "OK".
    } catch (error) {
      return Promise.reject(error); // Maneja errores.
    }
  }

}
