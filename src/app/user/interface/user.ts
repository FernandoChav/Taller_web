/**
 * This interface represent a user model
 */

export interface User {

    /**
     * User id 
     */

    id : number;

    /**
     * User RUT
     * This is identification national chilean 
     */

    rut : string;

    /**
     * User name
     */

    name : string;

    /**
     * This is the birthdate user
     */

    birthdate : string;

    /**
     * The gender user
     */

    genderType : number;

    /**
     * A boolean if user is active
     */

    isActive : boolean;

}