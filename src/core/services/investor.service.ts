import { Investor } from "@/core/entities/investor/investor";
import { InvestorApi } from "@/api/investor.api";

export class InvestorService {

    public static async editCommonData(investor: Investor): Promise<void> {
        if (!investor.id) {
            alert('Не установлен ID проекта')
            return
        }

        await InvestorApi.editCommonData( {
            investorId: investor.id,
            name: investor.name,
            description: investor.description,
        } )
    }

    public static async editInterests(id: string, interests: string[]): Promise<void> {
        await InvestorApi.editInterests(id, interests)
    }
}