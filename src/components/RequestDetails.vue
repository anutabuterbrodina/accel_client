<script setup lang="ts">
import { useRequestStore } from "@/stores/request";
import { defineProps, onMounted, ref } from "vue";
import { ERequestStatuses } from '@/core/entities/request/request-statuses.enum.js';
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { RequestApi } from "@/api/request/request.api";
import Modal from "@/components/UI/Modal.vue";
import RequestRejectForm from "@/components/forms/RequestRejectForm.vue";
import { useModalStore } from "@/stores/modal";
import { UserApi } from "@/api/user/user.api";
import { User } from "@/core/entities/user/user";
import { ERequestTypes } from "@/core/entities/request/request-types.enum";
import RegisterProjectRequestDetails from "@/components/RegisterProjectRequestDetails.vue";
import { Constants } from "@/core/static/constants";
import RegisterInvestorRequestDetails from "@/components/RegisterInvestorRequestDetails.vue";
import ChangeProjectBusinessDataRequestDetails from "@/components/ChangeProjectBusinessDataRequestDetails.vue";
import ChangeInvestorRequisitesRequestDetails from "@/components/ChangeInvestorRequisitesRequestDetails.vue";
import { RequestService } from "@/core/services/request.service";

const { currentUser } = useAuthStore()
const { request, loadRequest } = useRequestStore()
const { setVisibility, refreshStore: refreshModalStore } = useModalStore()
const route = useRoute()

const requestId = <string> route.params.requestId
const creator = ref<User>()

defineProps({
    isModerator: Boolean,
})

const accept = async () => {
    await RequestService.accept(requestId, currentUser.id)
    await loadRequest(requestId)
    refreshModalStore()
}

const reject = async () => {
    await RequestService.reject(request, currentUser.id)
    await loadRequest(requestId)
    refreshModalStore()
}

onMounted(async () => {
    await loadRequest(requestId)
    creator.value = await UserApi.getSingle(request.creatorId)
})

</script>

<template>
    <v-card class="mb-5">
        <v-card-item class="py-5">
            <v-row>
                <v-col>
                    <v-card-title>
                        Тип: {{ Constants.getRequestTypeNameByValue(request.type) }}
                    </v-card-title>

<!--                    <v-card-subtitle>-->
<!--                        <span>-->
<!--                            {{ request.createdAt }}-->
<!--                        </span>-->
<!--                    </v-card-subtitle>-->

                    <v-card-subtitle>
                        Создатель: {{ creator?.name || '' }} {{ creator?.surname || '' }}
                    </v-card-subtitle>

                </v-col>

                <v-col style="display: flex; flex-direction: column; align-items: flex-end">
                    <v-chip color="green" variant="flat" v-if="request.status === ERequestStatuses.ACCEPTED">
                        {{ Constants.getRequestStatusNameByValue( request.status ) }}
                    </v-chip>
                    <v-chip color="blue" variant="flat" v-if="request.status === ERequestStatuses.ON_MODERATION">
                        {{ Constants.getRequestStatusNameByValue( request.status ) }}
                    </v-chip>
                    <v-chip color="red" variant="flat" v-if="request.status === ERequestStatuses.REJECTED">
                        {{ Constants.getRequestStatusNameByValue( request.status ) }}
                    </v-chip>

                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card-subtitle>
                        <span v-if="(request.type === ERequestTypes.CHANGE_PROJECT_BUSINESS_DATA)" @click.prevent>
                            <router-link :to="{ name: 'project', params: { projectId: request.projectId } }">
                                <strong>По проекту:</strong> {{ request.projectId }}
                            </router-link>
                        </span>
                        <span v-if="(request.type === ERequestTypes.CHANGE_INVESTOR_REQUISITES)" @click.prevent>
                            <router-link :to="{ name: 'investor', params: { investorId: request.investorId } }">
                                <strong>По инвестору:</strong> {{ request.investorId }}
                            </router-link>
                        </span>
                    </v-card-subtitle>

                    <v-row v-if="request.rejectReason">
                        <v-col cols="2">
                            Причина:
                        </v-col>
                        <v-divider vertical />
                        <v-col>
                            <v-card-subtitle>
                                Причина: {{ request.rejectReason }}
                            </v-card-subtitle>
                        </v-col>
                    </v-row>
                    <v-row v-if="request.rejectMessage">
                        <v-col cols="2">
                            Комментарий:
                        </v-col>
                        <v-divider vertical />
                        <v-col>
                            <v-card-subtitle>
                                {{ request.rejectMessage }}
                            </v-card-subtitle>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-item>
    </v-card>



    <v-row v-if="isModerator && request.status === ERequestStatuses.ON_MODERATION" class="mb-5">
        <v-col>
            <v-btn color="primary" class="w-50" @click="accept">
                Принять
            </v-btn>
        </v-col>
        <v-col>
            <v-btn color="primary" class="w-50" @click="setVisibility(true)">
                Отказать
            </v-btn>
        </v-col>
    </v-row>


    <div v-if="request.type === ERequestTypes.REGISTER_PROJECT" class="mb-5">
        <RegisterProjectRequestDetails class="pb-5"/>
    </div>

    <div v-if="request.type === ERequestTypes.REGISTER_INVESTOR" class="mb-5">
        <RegisterInvestorRequestDetails class="pb-5"/>
    </div>

    <div v-if="request.type === ERequestTypes.CHANGE_PROJECT_BUSINESS_DATA" class="mb-5">
        <ChangeProjectBusinessDataRequestDetails class="pb-5"/>
    </div>

    <div v-if="request.type === ERequestTypes.CHANGE_INVESTOR_REQUISITES" class="mb-5">
        <ChangeInvestorRequisitesRequestDetails class="pb-5"/>
    </div>
    <Modal>
        <RequestRejectForm
            @reject="reject"
        />
    </Modal>
</template>

<style scoped>

</style>