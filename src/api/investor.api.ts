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
                result.interestsList,
                result.id,
                result.membersList,
                result.isActive,
                result.type,
                result.createdAt || null,
                result.ownerId || null,
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
                item.interestList,
                item.id,
                item.memberList,
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
        const data = { investorId, interests }

        try {
            const result = await this.post(url, data)

        } catch (e) {
            alert('Не удалось изменить категории интересов')
        }
    }

    public static async deactivate(investorId: string): Promise<void> {
        const url = this.formURL('deactivate', 'investor')
        const data = { investorId }

        try {
            const result = await this.post(url, data)

        } catch (e) {
            alert('Не удалось деактивировать')
        }
    }

    public static async activate(investorId: string): Promise<void> {
        const url = this.formURL('activate', 'investor')
        const data = { investorId }

        try {
            const result = await this.post(url, data)

        } catch (e) {
            alert('Не удалось активировать')
        }
    }
}