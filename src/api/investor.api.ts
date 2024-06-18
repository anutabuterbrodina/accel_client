import { ApiManager } from "@/api/api-manager";
import { Investor } from "@/core/entities/investor/investor";
import type { IInvestor } from "@/api/investor/investor.interface";
import type { IInvestorsListRequest } from "@/api/investor/investors-list-request.interface";
import type { IInvestorListItem } from "@/api/investor/investor-list-item.interface";
import { Requisites } from "@/core/entities/investor/requisites";
import type { IEditInvestorCommonData } from "@/api/investor/edit-investor-common-data.interface";

export class InvestorApi extends ApiManager {
    public static async getSingle(investorId: string): Promise<Investor> {
        const url = this.formURL( '', 'investor' )
        const params = { investorId }

        try {
            const result: IInvestor = await this.get( url, params )

            return new Investor(
                result.requisites,
                result.name,
                result.description || '',
                result.interests,
                result.id,
                result.members,
                result.isActive,
                result.type,
                result.createdAt || null,
            )
        } catch (e) {
            console.log( 'Не удалось загрузить инвестора' )
        }
    }

    public static async getList(rawParams: IInvestorsListRequest): Promise<Investor[]> {
        const url = this.formURL('', 'investors')
        const params = this.clearParams(rawParams)

        try {
            const result: IInvestorListItem[] = await this.get(url, params)

            return result.map(item => new Investor(
                new Requisites(),
                item.name,
                item?.description || '',
                item.interests,
                item.id,
                item.members,
                true,
                item.type,
                item.createdAt,
            ))

        } catch (e) {
            return []
        }
    }

    public static async editCommonData(data: IEditInvestorCommonData): Promise<void> {
        const url = this.formURL('edit-description-data', 'investor')

        try {
            const result = await this.post(url, data)

        } catch (e) {
            alert('Не удалось изменить данные описания проекта')
        }
    }

    public static async editInterests(investorId: string, interests: string[]): Promise<void> {
        const url = this.formURL('edit-interests', 'investor')
        const data = { interests }

        try {
            const result = await this.post(url, data)

        } catch (e) {
            alert('Не удалось изменить категории интересов')
        }
    }
}