import { ApiManager } from "@/api/api-manager";
import { User } from "@/core/entities/user";
import { Request } from "@/core/entities/request";

export class RequestApi extends ApiManager {

    public async getSingle(params): Promise<User> {

        const result = await this.get( this.formURL('request'), {
            params: { ...params }
        })

        return
        // return new Investor()
    }

    public async getList(params): Promise<Request[]> {
        const result = <[any]> await this.get( this.formURL('requests'), {
            params: { ...this.clearParams(params) }
        })

        return result.map(item => new Request(
            item.id,
            item.status,
            item.type,
            item.creatorId,
            item.createdAt,
            item?.projectId || item?.investorId || null,
            item.rejectReason,
            item.rejectMessage
        )) || []
    }

    public async createProjectRequest(
        userId: string,
        comment: string,
        name: string,
        description: string,
        investmentMin: number,
        investmentMax: number,
        tags: string[]
    ): Promise<void> {
        const result = await this.post( this.formURL('requests', 'new/register-project'), {
            userId,
            comment,
            name,
            description,
            investmentMin,
            investmentMax,
            tags,
        })
    }
}