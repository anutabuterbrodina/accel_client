import { EProjectStatuses } from "@/core/entities/project/project-statuses.enum";

export interface IProject {
    id: string,
    status: EProjectStatuses,
    name: string,
    description: string | null,
    investmentMin: number,
    investmentMax: number,
    contactId: string,
    ownerId: string,
    createdAt: number,
    tagsList: string[],
    membersList: string[],
}