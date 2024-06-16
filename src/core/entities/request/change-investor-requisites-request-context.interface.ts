import { EInvestorTypes } from "@/core/entities/investor/investor-types.interface";
import type { IRequisites } from "@/core/entities/investor/requisites.interface";

export interface IChangeInvestorRequisitesRequestContext {
    id: string,
    type: EInvestorTypes,
    requisites: IRequisites,
}