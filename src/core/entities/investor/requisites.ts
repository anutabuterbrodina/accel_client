export class Requisites {

    constructor(
        private _legalName: string | null = null,
        private _address: string | null = null,
        private _INN: string | null = null,
        private _OGRN: string | null = null,
        private _KPP: string | null = null,
        private _OKPO: string | null = null,
        private _BIK: string | null = null,
    ) {}

    get legalName(): string | null {
        return this._legalName;
    }

    set legalName(value: string | null) {
        this._legalName = value;
    }

    get address(): string | null {
        return this._address;
    }

    set address(value: string | null) {
        this._address = value;
    }

    get INN(): string | null {
        return this._INN;
    }

    set INN(value: string | null) {
        this._INN = value;
    }

    get OGRN(): string | null {
        return this._OGRN;
    }

    set OGRN(value: string | null) {
        this._OGRN = value;
    }

    get KPP(): string | null {
        return this._KPP;
    }

    set KPP(value: string | null) {
        this._KPP = value;
    }

    get OKPO(): string | null {
        return this._OKPO;
    }

    set OKPO(value: string | null) {
        this._OKPO = value;
    }

    get BIK(): string | null {
        return this._BIK;
    }

    set BIK(value: string | null) {
        this._BIK = value;
    }
}