import { ApiManager } from "@/api/api-manager";
import { User } from "@/core/entities/user/user";
import type { IAuthResult } from "@/api/auth/auth-result.interface";
import type { IPayload } from "@/core/helpers/payload.interface";
import { EUserRoles } from "@/core/entities/user/user-roles.enum";
import { EUserAccountTypes } from "@/core/entities/user/user-account-types.enum";

interface ISignUp {
    name: string,
    surname: string,
    email: string,
    phone: string,
    password: string
    type: EUserAccountTypes,
}

interface ILogIn {
    email: string,
    password: string
}

export class AuthAPI extends ApiManager {

    public static async signup(data: ISignUp): Promise<string> {
        const url = this.formURL('signup', 'users')

        const result: IAuthResult = await this.post(url, data)

        if (result) {
            this._setAuthToken(result.token)
            this._setPayload(result.payload)
        }
    }

    public static async login(email: string, password: string): Promise<string> {
        const url = this.formURL('login', 'user')
        const data: ILogIn = { email, password }

        const result: IAuthResult = await this.post(url, data)

        if (result) {
            this._setAuthToken(result.token)
            this._setPayload(result.payload)
        }
    }

    public static logout() {
        this._clearAuthToken()
        this._clearPayload()
    }
    
    public static getAuthToken(): string | null {
        return localStorage.getItem('authToken')
    }

    public static getPayload(): IPayload {
        const payload = localStorage.getItem('payload')

        if (!payload)
            return { id: 'unknown', email: 'unknown', role: EUserRoles.ANONYMOUS, type: EUserAccountTypes.ANONYMOUS }

        return JSON.parse(payload)
    }

    private static _setAuthToken(token: string) {
        localStorage.setItem('authToken', token)
    }

    private static _setPayload(userPayload: IPayload) {
        localStorage.setItem('payload', JSON.stringify(userPayload))
    }

    private static _clearAuthToken() {
        localStorage.removeItem('authToken')
    }

    private static _clearPayload() {
        localStorage.removeItem('payload')
    }
}