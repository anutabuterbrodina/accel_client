import { ApiManager } from "@/api/api-manager";
import { Investor } from "@/core/entities/investor";

export class InvestorApi extends ApiManager {
    public async getSingle(params): Promise<Investor> {

        const result = await this.get( this.formURL('investor'), {
            params: { ...params }
        })

        return
        // return new Investor()
    }

    public async getList(params): Promise<Investor[]> {
        const result = <[any]> await this.get( this.formURL('investors'), {
            params: { ...this.clearParams(params) }
        })

        return result.map(item => new Investor(
            item.id,
            item.name,
            item.description,
            item.interestList,
            item.createdAt,
            item.membersList,
            item.type,
        )) || []
    }
}