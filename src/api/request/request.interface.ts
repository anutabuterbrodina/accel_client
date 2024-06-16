import type { TRequestContent } from "@/core/entities/request/request-content.type";
import { ERequestStatuses } from "@/core/entities/request/request-statuses.enum";
import { ERequestTypes } from "@/core/entities/request/request-types.enum";
import { ERequestRejectReasons } from "@/core/entities/request/request-reject-reasons.enum";

export interface IRequest {
    requestContent: TRequestContent,
    id: string,
    status: ERequestStatuses,
    type: ERequestTypes,
    creatorId: string,
    contactEmail: string,
    creatorComment: string,
    createdAt: number,
    rejectReason?: ERequestRejectReasons,
    rejectMessage?: string,
    projectId?: string
    investorId?: string
}