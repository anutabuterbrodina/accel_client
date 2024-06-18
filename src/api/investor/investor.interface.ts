import { EInvestorTypes } from "@/core/entities/investor/investor-types.interface";
import type { IRequisites } from "@/api/investor/requisites.interface";

export interface IInvestor {
    interestsList: string[],
    membersList: string[],
    id: string,
    isActive: boolean,
    type: EInvestorTypes,
    name: string,
    description?: string,
    createdAt?: number,
    ownerId?: string,
    requisites: IRequisites,
}