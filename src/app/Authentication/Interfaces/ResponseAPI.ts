import { Role } from "./Role";

export interface ResponseAPI {
    tokenContent: string;
    role:         Role;
}