export class Project {
    set name(value: string) {
        this._name = value;
    }

    set description(value: string) {
        this._description = value;
    }

    set tags(value: string[]) {
        this._tags = value;
    }

    set investmentMin(value: number) {
        this._investmentMin = value;
    }

    set investmentMax(value: number) {
        this._investmentMax = value;
    }

    set contact(value: string) {
        this._contact = value;
    }

    set members(value: string[]) {
        this._members = value;
    }
    constructor(
        private readonly _id: string,
        private _name: string,
        private _description: string,
        private _tags: string[],
        private _investmentMin: number,
        private _investmentMax: number,
        private _contact: string,
        private _members: string[],
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

    get investmentMin(): number {
        return this._investmentMin
    }

    get investmentMax(): number {
        return this._investmentMax
    }

    get contact(): string {
        return this._contact
    }

    get members(): string[] {
        return this._members
    }
}