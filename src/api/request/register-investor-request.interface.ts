import type { IRequisites } from "@/core/entities/investor/requisites.interface";
import { EInvestorTypes } from "@/core/entities/investor/investor-types.interface";

export interface IRegisterInvestorRequest {
    userId: string
    comment: string,
    investorType: EInvestorTypes,
    name: string,
    description: string,
    requisites: IRequisites
    tags: string[],
}

