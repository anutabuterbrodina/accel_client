import type { IRequisites } from "@/core/entities/investor/requisites.interface";
import { EInvestorTypes } from "@/core/entities/investor/investor-types.interface";

export interface IChangeInvestorRequisitesRequest {
    userId: string
    investorId: string
    comment: string,
    investorType: EInvestorTypes,
    requisites: IRequisites,
}

