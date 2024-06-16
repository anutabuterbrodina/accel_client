export interface IRequestFilters {
    limit: number | null,
    statuses: string[] | null,
    userId: string | null,
    projectId: string | null,
    investorId: string | null,
    sortOption: string | null,
    sortOrder: string | null,
}