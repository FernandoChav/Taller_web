import { Injectable } from "@angular/core";
import { User } from "../interface/user";
import { LocalStorageService } from "../../Authentication/Services/local-storage.service";

/**
 * This is a session service for store in local storage service 
 * the user has logged 
 */

@Injectable({
  providedIn: 'root'
})
export class SessionService {

    /**
     * The main constructor 
     * @param storageService this is the storage service
     */

    constructor(private storageService : LocalStorageService) {}
    
    /**
     * Store a user in local storage 
     * @param user 
     */

    store(user : User) : void {

        this.storageService.setVar('name', user.name);
        this.storageService.setVar('birthdate', user.birthdate.split('T')[0]);
        this.storageService.setVar('gender', user.genderType);
        this.storageService.setVar('rut', user.rut);
        this.storageService.setVar('id', user.id);
    }

    /**
     * 
     * @returns Get the user logged from local storage
     */

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

    /**
     * Delete user logged from local storage
     * this is used when user over the session
     */

    delete() : void {
        this.storageService.deleteMany("name",
            "birthdate",
            "gender",
            "rut",
            "id"
        );
    }

}