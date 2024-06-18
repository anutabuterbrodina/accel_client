import { EUserRoles } from "@/core/entities/user/user-roles.enum";
import { EUserAccountTypes } from "@/core/entities/user/user-account-types.enum";

export interface IPayload {
    id: string,
    email: string,
    role: EUserRoles,
    type: EUserAccountTypes,
}