export interface IChangeProjectBusinessDataRequest {
    userId: string,
    projectId: string,
    comment: string,
    investmentMin: number,
    investmentMax: number,
    tags: string[],
}