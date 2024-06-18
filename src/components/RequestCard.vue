<script setup lang="ts">
import { defineProps } from "vue";
import type { PropType } from "vue";
import { Request } from "@/core/entities/request/request";
import { Constants } from "@/core/static/constants";
import { ERequestTypes } from "@/core/entities/request/request-types.enum";
import { ERequestStatuses } from "@/core/entities/request/request-statuses.enum";


defineProps({
    request: Object as PropType<Request>,
})
</script>

<template>
    <v-card
        class="mx-auto my-8"
        elevation="2"
        max-width="100%"
    >
        <v-card-item class="py-5">
            <v-row>
                <v-col>
                    <v-card-title>
                        Тип: {{ Constants.getRequestTypeNameByValue(request.type) }}
                    </v-card-title>
                    <v-card-subtitle>
                        <span>
                            {{ request.createdAt }}
                        </span>
                    </v-card-subtitle>
                    <v-card-subtitle>
                        <span>
                            {{ request.contactEmail }}
                        </span>
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
                            <router-link :to="{ name: 'project', params: { projectId: request.projectId ?? 'null' } }">
                                <strong>По проекту:</strong> {{ request.projectId }}
                            </router-link>
                        </span>
                        <span v-if="(request.type === ERequestTypes.CHANGE_INVESTOR_REQUISITES)" @click.prevent>
                            <router-link :to="{ name: 'investor', params: { investorId: request.investorId ?? 'null' } }">
                                <strong>По инвестору:</strong> {{ request.investorId }}
                            </router-link>
                        </span>
                    </v-card-subtitle>

                    <v-card-subtitle v-if="request.rejectReason">
                        <v-expansion-panels @click.prevent>
                            <v-expansion-panel>
                                <v-expansion-panel-title>
                                    Причина: {{ request.rejectReason }}
                                </v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    {{ request.rejectMessage }}
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-subtitle>
                </v-col>

                <v-col style="display: flex; flex-direction: column; align-items: flex-end">
                    <v-card-subtitle>
                        Пользователь: {{ request.creatorId }}
                    </v-card-subtitle>
                </v-col>
            </v-row>
        </v-card-item>
    </v-card>
</template>

<style scoped>

</style>