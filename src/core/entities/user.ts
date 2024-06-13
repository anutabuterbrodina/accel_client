export class User {
    constructor(
        private readonly _id: string,
        private          _name: string,
        private          _surname: string,
        private          _email: string,
        private          _phone: string,
        private readonly _role?: string,
    ) {}

    get id(): string {
        return this._id;
    }

    get role(): string | null {
        return this._role || null;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get surname(): string {
        return this._surname;
    }

    set surname(value: string) {
        this._surname = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get phone(): string {
        return this._phone;
    }

    set phone(value: string) {
        this._phone = value;
    }
}