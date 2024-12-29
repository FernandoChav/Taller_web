import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResponseAPI } from '../Interfaces/ResponseAPI';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedService {
  private baseUrl = 'http://localhost:5026';
  private http = inject(HttpClient);

  constructor() { }


  async login(form : any): Promise<ResponseAPI> {
    try {
      const response = await  firstValueFrom(this.http.post<ResponseAPI>(`${this.baseUrl}/api/authenticate`, form));
      return Promise.resolve(response);
    }
    catch (error) {
      return Promise.reject(error);
    }
    
  }

}
