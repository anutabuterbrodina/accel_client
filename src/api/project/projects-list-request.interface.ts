export interface IProjectsListRequest {
    limit: number | null,
    tags: string[] | null,
    userId: string | null,
    projectIds: string[] | null,
    nameSearchString: string | null,
    investmentMin: number | null,
    investmentMax: number | null,
    sortOption: string | null,
    sortOrder: string | null,
}