import { ERequestRejectReasons } from "@/core/entities/request/request-reject-reasons.enum";

export interface IRejectRequest {
    userId: string
    requestId: string
    rejectReason: ERequestRejectReasons
    rejectMessage: string
}