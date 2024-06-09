export class User {
    get surname(): string {
        return this._surname;
    }

    set surname(value: string) {
        this._surname = value;
    }
    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get role(): string {
        return this._role;
    }

    get email(): string {
        return this._email;
    }

    get phone(): string {
        return this._phone;
    }
    constructor(
        private readonly _id: string,
        private _name: string,
        private _surname: string,
        private _role: string,
        private _email: string,
        private _phone: string,
    ) {}
}