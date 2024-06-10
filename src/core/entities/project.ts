export class Project {
    get createdAt(): number {
        return this._createdAt;
    }

    set createdAt(value: number) {
        this._createdAt = value;
    }
    set name(value: string) {
        this._name = value;
    }

    set description(value: string) {
        this._description = value;
    }

    set tagsList(value: string[]) {
        this._tagsList = value;
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

    set membersList(value: string[]) {
        this._membersList = value;
    }
    constructor(
        private readonly _id: string,
        private _name: string,
        private _description: string,
        private _tagsList: string[],
        private _investmentMin: number,
        private _investmentMax: number,
        private _createdAt: number,
        private _membersList: string[],
        private _contact?: string,
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

    get tagsList(): string[] {
        return this._tagsList
    }

    get investmentMin(): number {
        return this._investmentMin
    }

    get investmentMax(): number {
        return this._investmentMax
    }

    get contact(): string | null {
        return this._contact || null
    }

    get membersList(): string[] {
        return this._membersList
    }
}