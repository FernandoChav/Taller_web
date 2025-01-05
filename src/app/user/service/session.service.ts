import { Injectable } from "@angular/core";
import { User } from "../interface/user";
import { LocalStorageService } from "../../Authentication/Services/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

    constructor(private storageService : LocalStorageService) {}
    
    store(user : User) : void {
        console.log("GUARDANDO USUARIO");
        this.storageService.setVar('name', user.name);
        this.storageService.setVar('birthdate', user.birthdate.split('T')[0]);
        this.storageService.setVar('gender', user.genderType);
        this.storageService.setVar('rut', user.rut);
        this.storageService.setVar('id', user.id);
    }

    get() : User {
        var userRead : User  = {
            name: this.storageService.getVar('name'),
            birthdate : this.storageService.getVar('birthdate'),
            genderType : this.storageService.getVar('gender'),
            rut : this.storageService.getVar('rut'),
            id : this.storageService.getVar('id'),
            isActive : true
        };

        return userRead;
    }

}