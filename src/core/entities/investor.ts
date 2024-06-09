export class Investor {
    get type(): string {
        return this._type;
    }
    set name(value: string) {
        this._name = value;
    }

    set description(value: string) {
        this._description = value;
    }

    set tags(value: string[]) {
        this._tags = value;
    }

    set members(value: string[]) {
        this._members = value;
    }
    get members(): string[] {
        return this._members;
    }
    constructor(
        private readonly _id: string,
        private _name: string,
        private _description: string,
        private _tags: string[],
        private _members: string[],
        private _type: string,
    ) {}

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get description(): string {
        return this._description
    }

    get tags(): string[] {
        return this._tags
    }
}