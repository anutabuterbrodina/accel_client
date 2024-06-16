import { EUserRoles } from "@/core/entities/user/user-roles.enum";

export interface IPayload {
    id: string,
    email: string,
    role: EUserRoles,
}