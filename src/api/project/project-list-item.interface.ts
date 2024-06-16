export interface IProjectListItem {
    id: string,
    name: string,
    description: string,
    investmentMin: number,
    investmentMax: number,
    createdAt: number,
    tagsList: string[],
    membersList: string[],
}