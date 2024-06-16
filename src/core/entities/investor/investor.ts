export class Investor {
    set type(value: string) {
        this._type = value;
    }
    get interestList(): string[] {
        return this._interestList;
    }

    set interestList(value: string[]) {
        this._interestList = value;
    }

    get createdAt(): number {
        return this._createdAt;
    }

    set createdAt(value: number) {
        this._createdAt = value;
    }

    get membersList(): string[] {
        return this._membersList;
    }

    set membersList(value: string[]) {
        this._membersList = value;
    }
    get type(): string {
        return this._type;
    }
    set name(value: string) {
        this._name = value;
    }

    set description(value: string) {
        this._description = value;
    }
    constructor(
        private readonly _id: string,
        private _name: string,
        private _description: string,
        private _interestList: string[],
        private _createdAt: number,
        private _membersList: string[],
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
}