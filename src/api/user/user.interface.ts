import { EUserRoles } from "@/core/entities/user/user-roles.enum";
import { EUserAccountTypes } from "@/core/entities/user/user-account-types.enum";

export interface IUser {
    id: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    isActive: boolean,
    role: EUserRoles,
    createdAt: number,
    type: EUserAccountTypes,
    updatedAt?: number,
}