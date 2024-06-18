import { EUserAccountTypes } from "@/core/entities/user/user-account-types.enum";

export interface IUserListItem {
    id: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    type: EUserAccountTypes,
}