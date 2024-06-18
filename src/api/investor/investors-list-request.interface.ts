export interface IInvestorsListRequest {
    limit: number | null,
    interests: string[] | null,
    types: string[] | null,
    userId: string | null,
    nameSearchString: string | null,
    sortOption: string | null,
    sortOrder: string | null,
}