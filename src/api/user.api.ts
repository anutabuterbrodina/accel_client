import { ApiManager } from "@/api/api-manager";
import { User } from "@/core/entities/user/user";

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
}