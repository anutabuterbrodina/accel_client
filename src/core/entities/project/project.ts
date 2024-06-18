import { EProjectStatuses } from "@/core/entities/project/project-statuses.enum";

export class Project {
    constructor(
        private _name:          string,
        private _description:   string,
        private _investmentMin: number,
        private _investmentMax: number,
        private _tags:          string[],
        private _id:            string | null             = null,
        private _createdAt:     number | null             = null,
        private _members:       string[] | null           = null,
        private _status:        EProjectStatuses | null   = null,
        private _contactId:     string | null             = null,
        private _ownerId:       string | null             = null,
        private _isBookmark:    boolean | null            = null,
    ) {}

    get isBookmark(): boolean | null {
        return this._isBookmark
    }

    set isBookmark(value: boolean) {
        this._isBookmark = value
    }

    get name(): string {
        return this._name
    }

    set name(value: string) {
        this._name = value
    }

    get description(): string {
        return this._description
    }

    set description(value: string) {
        this._description = value
    }

    get investmentMin(): number {
        return this._investmentMin
    }

    set investmentMin(value: number) {
        this._investmentMin = value
    }

    get investmentMax(): number {
        return this._investmentMax
    }

    set investmentMax(value: number) {
        this._investmentMax = value
    }

    get tags(): string[] {
        return this._tags
    }

    set tags(value: string[]) {
        this._tags = value
    }

    get id(): string | null {
        return this._id
    }

    get createdAt(): number | null {
        return this._createdAt
    }

    get members(): string[] | null {
        return this._members
    }

    get status(): EProjectStatuses | null {
        return this._status
    }

    get contactId(): string | null {
        return this._contactId
    }

    set id(value: string | null) {
        this._id = value;
    }

    set createdAt(value: number | null) {
        this._createdAt = value;
    }

    set members(value: string[] | null) {
        this._members = value;
    }

    set status(value: EProjectStatuses | null) {
        this._status = value;
    }

    set contactId(value: string | null) {
        this._contactId = value;
    }

    get ownerId(): string | null {
        return this._ownerId;
    }

    set ownerId(value: string | null) {
        this._ownerId = value;
    }
}