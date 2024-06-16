export interface IRegisterProjectRequestContext {
    id: string,
    name: string,
    description: string,
    investmentMin: number,
    investmentMax: number,
    tags: string[],
}