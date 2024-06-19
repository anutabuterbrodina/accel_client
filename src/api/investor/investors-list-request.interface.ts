import { EInvestorTypes } from "@/core/entities/investor/investor-types.interface";

export interface IInvestorsListRequest {
    limit: number | null,
    interests: string[] | null,
    types: EInvestorTypes[] | null,
    userId: string | null,
    nameSearchString: string | null,
    sortOption: string | null,
    sortOrder: string | null,
}