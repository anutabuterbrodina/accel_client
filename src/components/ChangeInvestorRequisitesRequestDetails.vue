<script setup lang="ts">
import { useRequestStore } from "@/stores/request";
import { Constants } from "@/core/static/constants";
import {
    IChangeInvestorRequisitesRequestContext
} from "@/core/entities/request/change-investor-requisites-request-context.interface";

const { request } = useRequestStore()
const content = <IChangeInvestorRequisitesRequestContext> request.content
</script>

<template>
    <v-card>
<!--        <v-card-title>Идентификатор проекта:</v-card-title>-->
<!--        <router-link :to="{ name: 'project', params: { projectId: content.id }}">-->
<!--            <v-card-text>-->
<!--                {{ content.id }}-->
<!--            </v-card-text>-->
<!--        </router-link>-->

<!--        <v-divider/>-->

        <v-card-title>Нвоый тип инвестора:</v-card-title>
        <v-card-text>
            {{ Constants.getInvestorTypeNameByValue(content.type) }}
        </v-card-text>

        <v-divider/>

        <v-card-title>Новые реквизиты:</v-card-title>
        <v-row>
            <v-col cols="3">
                <v-card-subtitle>Юр. название</v-card-subtitle>
            </v-col>
            <v-col>
                <v-card-subtitle>{{ content.requisites.legalName }}</v-card-subtitle>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">
                <v-card-subtitle>Юр. адрес</v-card-subtitle>
            </v-col>
            <v-col>
                <v-card-subtitle>{{ content.requisites.address }}</v-card-subtitle>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">
                <v-card-subtitle>ИНН</v-card-subtitle>
            </v-col>
            <v-col>
                <v-card-subtitle>{{ content.requisites.INN }}</v-card-subtitle>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">
                <v-card-subtitle>ОГРН</v-card-subtitle>
            </v-col>
            <v-col>
                <v-card-subtitle>{{ content.requisites.OGRN }}</v-card-subtitle>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">
                <v-card-subtitle>КПП</v-card-subtitle>
            </v-col>
            <v-col>
                <v-card-subtitle>{{ content.requisites.KPP }}</v-card-subtitle>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">
                <v-card-subtitle>ОКПО</v-card-subtitle>
            </v-col>
            <v-col>
                <v-card-subtitle>{{ content.requisites.OKPO }}</v-card-subtitle>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">
                <v-card-subtitle>БИК</v-card-subtitle>
            </v-col>
            <v-col>
                <v-card-subtitle>{{ content.requisites.BIK }}</v-card-subtitle>
            </v-col>
        </v-row>

    </v-card>

</template>

<style scoped>

</style>