import { EInvestorTypes } from "@/core/entities/investor/investor-types.interface";
import type { IRequisites } from "@/core/entities/investor/requisites.interface";

export interface IRegisterInvestorRequestContext {
    id: string,
    type: EInvestorTypes,
    name: string,
    description: string,
    requisites: IRequisites
    tags: string[],
}