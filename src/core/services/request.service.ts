import { Request } from "@/core/entities/request/request";
import { ERequestTypes } from "@/core/entities/request/request-types.enum";
import { RequestApi } from "@/api/request/request.api";
import type {
    IRegisterProjectRequestContext
} from "@/core/entities/request/register-project-request-context.interface";
import type {
    IRegisterInvestorRequestContext
} from "@/core/entities/request/register-investor-request-context.interface";
import type {
    IChangeProjectBusinessDataRequestContext
} from "@/core/entities/request/change-project-business-data-request-context.interface";
import type {
    IChangeInvestorRequisitesRequestContext
} from "@/core/entities/request/change-investor-requisites-request-context.interface";

export class RequestService {

    public static async create(request: Request): Promise<any> {
        if ( request.type === ERequestTypes.REGISTER_PROJECT ) {
            const content = <IRegisterProjectRequestContext>request.content
            await RequestApi.createRegisterProjectRequest( {
                userId: request.creatorId,
                comment: request.comment,
                name: content.name,
                description: content.description,
                investmentMin: content.investmentMin,
                investmentMax: content.investmentMax,
                tags: content.tags,
            } )
        }

        if ( request.type === ERequestTypes.REGISTER_INVESTOR ) {
            const content = <IRegisterInvestorRequestContext>request.content
            await RequestApi.createRegisterInvestorRequest( {
                userId: request.creatorId,
                comment: request.comment,
                investorType: content.type,
                name: content.name,
                description: content.description,
                requisites: content.requisites,
                tags: content.tags,
            } )
        }

        if ( request.type === ERequestTypes.CHANGE_PROJECT_BUSINESS_DATA ) {
            const content = <IChangeProjectBusinessDataRequestContext>request.content
            await RequestApi.createChangeProjectBusinessData( {
                userId: request.creatorId,
                comment: request.comment,
                projectId: content.id,
                investmentMin: content.investmentMin,
                investmentMax: content.investmentMax,
                tags: content.tags,
            } )
        }

        if ( request.type === ERequestTypes.CHANGE_INVESTOR_REQUISITES ) {
            const content = <IChangeInvestorRequisitesRequestContext>request.content
            await RequestApi.createChangeInvestorRequisites( {
                userId: request.creatorId,
                comment: request.comment,
                investorId: content.id,
                investorType: content.type,
                requisites: content.requisites,
            } )
        }
    }

    public static async accept(requestId: string, userId: string) {
        await RequestApi.accept(requestId, userId)
    }

    public static async reject(request: Request) {
        if (!request.id || !request.rejectReason) {
            alert('Не удалось найти ID или не установлена причина отказа')
            return
        }
        await RequestApi.reject({
            userId: request.creatorId,
            requestId: request.id,
            rejectReason: request.rejectReason,
            rejectMessage: request.rejectMessage || '',
        })
    }
}