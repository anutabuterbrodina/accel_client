import { EInvestorTypes } from "@/core/entities/investor/investor-types.interface";
import { Requisites } from "@/core/entities/investor/requisites";

export interface IRegisterInvestorRequestContext {
    id: string,
    type: EInvestorTypes,
    name: string,
    description: string,
    requisites: Requisites
    tags: string[],
}