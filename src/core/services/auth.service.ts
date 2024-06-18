import { AuthAPI } from "@/api/auth/auth.api";
import { User } from "@/core/entities/user/user";
import { Constants } from "@/core/static/constants";

export class AuthService {

    public static async signup(user: User, password: string): Promise<any> {
        await AuthAPI.signup({
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
            type: user.type,
            password,
        })
    }

    public static async login(email: string, password: string): Promise<any> {
        await AuthAPI.login(email, password)
    }

    public static logout(): void {
        AuthAPI.logout()
    }
}