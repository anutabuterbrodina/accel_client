import { IRegisterProjectRequestContext } from "@/core/entities/request/register-project-request-context.interface";
import { IRegisterInvestorRequestContext } from "@/core/entities/request/register-investor-request-context.interface";
import {
    IChangeProjectBusinessDataRequestContext
} from "@/core/entities/request/change-project-business-data-request-context.interface";
import {
    IChangeInvestorRequisitesRequestContext
} from "@/core/entities/request/change-investor-requisites-request-context.interface";


export type TRequestContent = IRegisterProjectRequestContext
                            | IRegisterInvestorRequestContext
                            | IChangeProjectBusinessDataRequestContext
                            | IChangeInvestorRequisitesRequestContext