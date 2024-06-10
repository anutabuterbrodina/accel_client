export class Request {
    get targetId(): string | null {
        return this._targetId || null;
    }

    set targetId(value: string) {
        this._targetId = value;
    }
    get id(): string {
        return this._id;
    }
    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    get creatorId(): string {
        return this._creatorId;
    }

    set creatorId(value: string) {
        this._creatorId = value;
    }

    get rejectReason(): string | null {
        return this._rejectReason || null;
    }

    set rejectReason(value: string) {
        this._rejectReason = value;
    }

    get rejectMessage(): string | null {
        return this._rejectMessage || null;
    }

    set rejectMessage(value: string) {
        this._rejectMessage = value;
    }

    constructor(
        private readonly _id: string,
        private _type: string,
        private _status: string,
        private _creatorId: string,
        private _targetId?: string,
        private _rejectReason?: string,
        private _rejectMessage?: string,
    ) {}
}