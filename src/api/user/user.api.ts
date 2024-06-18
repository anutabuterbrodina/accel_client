import { ApiManager } from "@/api/api-manager";
import { User } from "@/core/entities/user/user";
import type { IUser } from "@/api/user/user.interface";
import type { IUserListItem } from "@/api/user/user-list-item.interface";

export class UserApi extends ApiManager {

    public static async getSingle(userId: string): Promise<User> {
        const url = this.formURL('', 'user')
        const params = { userId }

        try {
            const result: IUser = await this.get(url, params)

            return new User(
                result.name,
                result.surname,
                result.email,
                result.phone,
                result.type,
                result.id,
                result.role,
            )
        } catch (e) {
            console.log('Не удалось загрузить пользователя')
        }
    }

    public static async getList(userIds: string[]): Promise<User[]> {
        const url = this.formURL( '', 'users' )
        const params = { userIds }

        try {
            const result: IUserListItem[] = await this.get( url, params )

            return result.map( item => new User(
                item.name,
                item.surname,
                item.email,
                item.phone,
                item.type,
                item.id,
            ) )

        } catch ( e ) {
            return []
        }
    }
}