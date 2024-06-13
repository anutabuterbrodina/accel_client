import { ApiManager } from "@/api/api-manager";
import { User } from "@/core/entities/user";

export class UserApi extends ApiManager {

    public async getSingle(params): Promise<User> {

        const result = await this.get( this.formURL(), {
            params: { ...params }
        })

        return
        // return new Investor()
    }

    public async getList(userIds: string[]): Promise<User[]> {
        const result = <[any]> await this.get( this.formURL(), {
            params: { userIds }
        })

        return result.map(item => new User(
            item.id,
            item.name,
            item.surname,
            item.email,
            item.phone,
        )) || []
    }

    public async login({ email, password }): Promise<string> {
        const result = await this.post( this.formURL('user', 'login'), { email, password })

        if (result) {
            this._setAuthToken(result.token, result.userId)
        }
    }

    public logout() {
        this._clearAuthToken()
    }

    public async signup(payload): Promise<string> {
        const result = await this.post(
            this.formURL('users', 'signup'),
            { ...payload }
        )
        this._setAuthToken(result.token, result.userId)
    }

    public getAuthToken(): string | null {
        return localStorage.getItem('authToken')
    }

    public getUserId(): string | null {
        return localStorage.getItem('userId')
    }

    private _setAuthToken(token: string, userId: string) {
        localStorage.setItem('authToken', token)
        localStorage.setItem('userId', userId)
    }

    public _clearAuthToken() {
        localStorage.removeItem('authToken')
        localStorage.removeItem('userId')
    }
}