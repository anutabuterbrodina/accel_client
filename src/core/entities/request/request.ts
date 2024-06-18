import { ERequestTypes } from "@/core/entities/request/request-types.enum";
import { ERequestStatuses } from "@/core/entities/request/request-statuses.enum";
import type { TRequestContent } from "@/core/entities/request/request-content.type";
import { ERequestRejectReasons } from "@/core/entities/request/request-reject-reasons.enum";

export class Request {

    constructor(
        private _type:          ERequestTypes,
        private _creatorId:     string,
        private _contactEmail:  string,
        private _comment:       string = '',
        private _content:       TRequestContent | null       = null,
        private _rejectReason:  ERequestRejectReasons | null = null,
        private _rejectMessage: string | null                = null,
        private _id:            string | null                = null,
        private _status:        ERequestStatuses | null      = null,
        private _projectId:     string | null                = null,
        private _investorId:    string | null                = null,
        private _createdAt:     number | null                = null,
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

    set type(value: ERequestTypes) {
        this._type = value;
    }

    set creatorId(value: string) {
        this._creatorId = value;
    }

    set contactEmail(value: string) {
        this._contactEmail = value;
    }

    set content(value: TRequestContent | null) {
        this._content = value;
    }

    set id(value: string | null) {
        this._id = value;
    }

    set status(value: ERequestStatuses | null) {
        this._status = value;
    }

    set projectId(value: string | null) {
        this._projectId = value;
    }

    set investorId(value: string | null) {
        this._investorId = value;
    }

    set createdAt(value: number | null) {
        this._createdAt = value;
    }
}