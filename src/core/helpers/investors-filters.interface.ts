import { EInvestorTypes } from "@/core/entities/investor/investor-types.interface";

export interface IInvestorsFilters {
    interests: string[] | null,
    types: EInvestorTypes[] | null,
}