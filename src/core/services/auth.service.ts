import { AuthAPI } from "@/api/auth/auth.api";
import { User } from "@/core/entities/user/user";

export class AuthService {

    public static async signup(user: User, password: string): Promise<any> {
        await AuthAPI.signup(user, password)
    }

    public static async login(email: string, password: string): Promise<any> {
        await AuthAPI.login(email, password)
    }

    public static logout(): void {
        AuthAPI.logout()
    }
}