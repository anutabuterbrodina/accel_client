<script setup lang="ts">
import { defineProps, PropType, ref } from "vue/dist/vue";
import { Request } from "@/core/entities/request";
import { useFilterStore } from "@/stores/filter";

defineProps({
    request: Object as PropType<Request>,
    isModerator: Boolean,
})

const { requestTypes, requestStatuses } = useFilterStore()

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
                        {{ requestTypes[request.type] }}
                    </v-card-title>
                </v-col>

                <v-col style="display: flex; flex-direction: column; align-items: flex-end">
                    <v-chip color="green" variant="flat" v-if="requestStatuses[request.status] === 'Одобрена'">
                        Одобрена
                    </v-chip>
                    <v-chip color="blue" variant="flat" v-if="requestStatuses[request.status] === 'На модерации'">
                        На модерации
                    </v-chip>
                    <v-chip color="red" variant="flat" v-if="requestStatuses[request.status] === 'Отклонена'">
                        Отклонена
                    </v-chip>

                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card-subtitle>
                        <span v-if="request.targetId && (request.type === 'Заявка на изменение данных проекта'  || request.type === 'Заявка на создание проекта')">
                            <strong>По проекту:</strong> {{ request.targetId }}
                        </span>
                        <span v-if="request.targetId && (request.type === 'Заявка на изменение данных инвестора' || request.type === 'Заявка на создание инвестора')">
                            <strong>По инвестору:</strong> {{ request.targetId }}
                        </span>
                    </v-card-subtitle>

                    <v-card-subtitle v-if="request.rejectReason">
                        <v-expansion-panels>
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

        <v-btn color="primary" v-if="isModerator">
            Редактировать
        </v-btn>
    </v-card>
</template>

<style scoped>

</style>