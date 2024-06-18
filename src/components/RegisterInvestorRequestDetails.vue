<script setup lang="ts">

import { useRequestStore } from "@/stores/request";
import type { IRegisterInvestorRequestContext } from "@/core/entities/request/register-investor-request-context.interface";
import { Constants } from "@/core/static/constants";

const { request } = useRequestStore()
const content = <IRegisterInvestorRequestContext> request.content
</script>

<template>
    <v-card>
        <v-card-title>Название:</v-card-title>
        <v-card-text>
            {{ content.name }}
        </v-card-text>

        <v-card-title>Описание:</v-card-title>
        <v-card-text>
            {{ content.description }}
        </v-card-text>

        <v-divider/>

        <v-card-title>Категории:</v-card-title>
        <v-chip
            v-for="tag in content.tags"
            class="ma-2"
            color="pink"
            label
            text-color="white"
            size="x-small"
        >
            <v-icon start icon="mdi-label"></v-icon>
            {{ tag }}
        </v-chip>

        <v-divider/>

        <v-card-title>Тип инвестора:</v-card-title>
        <v-card-text>
            {{ Constants.getInvestorTypeNameByValue(content.type) }}
        </v-card-text>

        <v-divider/>

        <v-card-title>Реквизиты:</v-card-title>
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