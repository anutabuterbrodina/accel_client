import { EProjectStatuses } from "@/core/entities/project/project-statuses.enum";

export class Project {
    constructor(
        private          _name:          string,
        private          _description:   string,
        private          _investmentMin: number,
        private          _investmentMax: number,
        private          _tags:          string[],
        private readonly _id:            string | null             = null,
        private readonly _createdAt:     number | null             = null,
        private readonly _members:       string[] | null           = null,
        private readonly _status:        EProjectStatuses | null   = null,
        private readonly _contactId:     string | null             = null,
    ) {}

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
}