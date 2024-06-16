export interface IRegisterProjectRequest {
    userId: string
    comment: string,
    name: string,
    description: string,
    investmentMin: number,
    investmentMax: number,
    tags: string[],
}