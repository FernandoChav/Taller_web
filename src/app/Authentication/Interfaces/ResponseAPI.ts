import { User } from "../../user/interface/user";
import { Role } from "./Role";

export interface ResponseAPI {
    token: Token;
    role:         Role;
    userView : User;
}

export interface Token {
    tokenContent : string;
}