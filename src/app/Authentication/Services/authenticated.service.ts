import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { ResponseAPI } from '../Interfaces/ResponseAPI';
import { firstValueFrom } from 'rxjs';
import { enviroment } from '../../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedService {
  private baseUrl = '';
  private http = inject(HttpClient);

  constructor() { 
    this.baseUrl = enviroment.apiUrl;
  }


  async login(form : any): Promise<ResponseAPI> {
    try {
      const response = await  firstValueFrom(this.http.post<ResponseAPI>(`${this.baseUrl}/api/authenticate`, form));
      return Promise.resolve(response);
    }
    catch (error) {
      return Promise.reject(error);
    }
    
  }
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
