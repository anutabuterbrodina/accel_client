import { ERequestStatuses } from "@/core/entities/request/request-statuses.enum";

export interface IRequestsFilters {
    statuses: ERequestStatuses[] | null,
    projectId: string | null,
    investorId: string | null,
}