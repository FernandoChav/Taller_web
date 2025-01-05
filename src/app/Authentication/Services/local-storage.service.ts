import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setVar(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getVar(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeVar(key: string) {
    localStorage.removeItem(key);
  }

  deleteMany(...keys : string[]) {
      keys.forEach(key => this.removeVar(key));
  }
  
}
