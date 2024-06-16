import { ERequestTypes } from "@/core/entities/request/request-types.enum";
import { ERequestStatuses } from "@/core/entities/request/request-statuses.enum";
import type { TRequestContent } from "@/core/entities/request/request-content.type";
import { ERequestRejectReasons } from "@/core/entities/request/request-reject-reasons.enum";

export class Request {

    constructor(
        private readonly _type:          ERequestTypes,
        private readonly _creatorId:     string,
        private readonly _contactEmail:  string,
        private          _comment:       string = '',
        private readonly _content:       TRequestContent | null       = null,
        private          _rejectReason:  ERequestRejectReasons | null = null,
        private          _rejectMessage: string | null                = null,
        private readonly _id:            string | null                = null,
        private readonly _status:        ERequestStatuses | null      = null,
        private readonly _projectId:     string | null                = null,
        private readonly _investorId:    string | null                = null,
        private readonly _createdAt:     number | null                = null,
    ) {}

    get type(): ERequestTypes {
        return this._type
    }

    get creatorId(): string {
        return this._creatorId
    }

    get contactEmail(): string {
        return this._contactEmail
    }

    get comment(): string {
        return this._comment
    }

    set comment(value: string) {
        this._comment = value
    }

    get content(): TRequestContent | null {
        return this._content
    }

    get rejectReason(): ERequestRejectReasons | null {
        return this._rejectReason
    }

    set rejectReason(value: ERequestRejectReasons | null) {
        this._rejectReason = value
    }

    get rejectMessage(): string | null {
        return this._rejectMessage
    }

    set rejectMessage(value: string | null) {
        this._rejectMessage = value
    }

    get id(): string | null {
        return this._id
    }

    get status(): ERequestStatuses | null {
        return this._status
    }

    get projectId(): string | null {
        return this._projectId
    }

    get investorId(): string | null {
        return this._investorId
    }

    get createdAt(): number | null {
        return this._createdAt
    }
}