import { ERequestStatuses } from "@/core/entities/request/request-statuses.enum";
import { ERequestTypes } from "@/core/entities/request/request-types.enum";
import { ERequestRejectReasons } from "@/core/entities/request/request-reject-reasons.enum";

export interface IRequestListItem {
    id: string,
    status: ERequestStatuses,
    type: ERequestTypes,
    createAt: number,
    creatorId: string,
    creatorEmail: string,
    rejectReason?: ERequestRejectReasons,
    rejectMessage?: string,
    projectId?: string
    investorId?: string
}