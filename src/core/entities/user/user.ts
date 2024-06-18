import { EUserRoles } from "@/core/entities/user/user-roles.enum";
import { EUserAccountTypes } from "@/core/entities/user/user-account-types.enum";

export class User {

    constructor(
        private _name:    string,
        private _surname: string,
        private _email:   string,
        private _phone:   string,
        private _type:    EUserAccountTypes,
        private _id:      string | null     = null,
        private _role:    EUserRoles | null = null,
    ) {}

    get name(): string {
        return this._name
    }

    set name(value: string) {
        this._name = value
    }

    get surname(): string {
        return this._surname
    }

    set surname(value: string) {
        this._surname = value
    }

    get email(): string {
        return this._email
    }

    set email(value: string) {
        this._email = value
    }

    get phone(): string {
        return this._phone
    }

    set phone(value: string) {
        this._phone = value
    }

    get type(): EUserAccountTypes {
        return this._type
    }

    set type(value: EUserAccountTypes) {
        this._type = value
    }

    get id(): string | null {
        return this._id
    }

    get role(): EUserRoles | null {
        return this._role
    }

    set id(value: string | null) {
        this._id = value;
    }

    set role(value: EUserRoles | null) {
        this._role = value;
    }
}