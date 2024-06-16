import type { IPayload } from "@/core/helpers/payload.interface";

export interface IAuthResult {
    payload: IPayload
    token: string
}

