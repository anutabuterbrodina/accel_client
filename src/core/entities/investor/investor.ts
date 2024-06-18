import { Requisites } from "@/core/entities/investor/requisites";
import { EInvestorTypes } from "@/core/entities/investor/investor-types.interface";

export class Investor {
    constructor(
        private _requisites: Requisites,
        private _name: string,
        private _description: string,
        private _interests: string[],
        private _id: string | null = null,
        private _members: string[] | null = null,
        private _isActive: boolean | null = null,
        private _type: EInvestorTypes,
        private _createdAt: number | null = null,
        private _ownerId: string | null = null,
    ) {}

    get requisites(): Requisites {
        return this._requisites;
    }

    set requisites(value: Requisites) {
        this._requisites = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get interests(): string[] {
        return this._interests;
    }

    set interests(value: string[]) {
        this._interests = value;
    }

    get id(): string | null {
        return this._id;
    }

    set id(value: string | null) {
        this._id = value;
    }

    get members(): string[] | null {
        return this._members;
    }

    set members(value: string[] | null) {
        this._members = value;
    }

    get isActive(): boolean | null {
        return this._isActive;
    }

    set isActive(value: boolean | null) {
        this._isActive = value;
    }

    get type(): EInvestorTypes {
        return this._type;
    }

    set type(value: EInvestorTypes) {
        this._type = value;
    }

    get createdAt(): number | null {
        return this._createdAt;
    }

    set createdAt(value: number | null) {
        this._createdAt = value;
    }

    get ownerId(): string | null {
        return this._ownerId;
    }

    set ownerId(value: string | null) {
        this._ownerId = value;
    }
}