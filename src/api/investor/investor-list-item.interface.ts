import { EInvestorTypes } from "@/core/entities/investor/investor-types.interface";

export interface IInvestorListItem {
    interestList: string[],
    memberList: string[],
    id: string,
    name: string,
    description: string,
    createdAt: number,
    type: EInvestorTypes,
}