export class Request {
    set status(value: string) {
        this._status = value;
    }

    set type(value: string) {
        this._type = value;
    }

    set creatorId(value: string) {
        this._creatorId = value;
    }

    set createdAt(value: number) {
        this._createdAt = value;
    }

    set targetId(value: string) {
        this._targetId = value;
    }

    set contactEmail(value: string) {
        this._contactEmail = value;
    }

    set comment(value: string) {
        this._comment = value;
    }
    get id(): string | null {
        return this._id || null;
    }

    get status(): string | null {
        return this._status || null;
    }

    get type(): string | null {
        return this._type || null;
    }

    get creatorId(): string | null {
        return this._creatorId || null;
    }

    get createdAt(): number | null {
        return this._createdAt || null;
    }

    get targetId(): string | null {
        return this._targetId || null;
    }

    get rejectReason(): string | null {
        return this._rejectReason || null;
    }

    get rejectMessage(): string | null {
        return this._rejectMessage || null;
    }

    get contactEmail(): string | null {
        return this._contactEmail || null;
    }

    get comment(): string | null {
        return this._comment || null;
    }

    get content(): object | null {
        return this._content || null;
    }
    constructor(
        private readonly _id?: string,
        private _status?: string,
        private _type?: string,
        private _creatorId?: string,
        private _createdAt?: number,
        private _targetId?: string,
        private readonly _rejectReason?: string,
        private readonly _rejectMessage?: string,
        private _contactEmail?: string,
        private _comment?: string,
        private _content?: object,
    ) {}
}