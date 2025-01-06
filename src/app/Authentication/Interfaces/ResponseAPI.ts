import { User } from "../../user/interface/user";
import { Role } from "./Role";

/**
 * This model contains the information that reply the server when a 
 * user is authenticated
 */

export interface ResponseAPI {

    /**
     * The token
     */

    token: Token;

    /**
     * The role
     */

    role:         Role;

    /**
     * The user 
     */

    userView : User;
}


/**
 * This is class represent a bear token
 */

export interface Token {

    /**
     * The token content as string
     */

    tokenContent : string;
}