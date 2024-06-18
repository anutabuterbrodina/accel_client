import type { IRequisites } from "@/api/investor/requisites.interface";
import { EInvestorTypes } from "@/core/entities/investor/investor-types.interface";

export interface IChangeInvestorRequisitesRequest {
    userId: string
    investorId: string
    comment: string,
    investorType: EInvestorTypes,
    requisites: IRequisites,
}

