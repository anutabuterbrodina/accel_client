<script setup lang="ts">
import { useRequestStore } from "@/stores/request";
import {
    IChangeProjectBusinessDataRequestContext
} from "@/core/entities/request/change-project-business-data-request-context.interface";

const { request } = useRequestStore()
const content = <IChangeProjectBusinessDataRequestContext> request.content
</script>

<template>
    <v-card>
<!--        <v-card-title>Идентификатор проекта:</v-card-title>-->
<!--        <router-link :to="{ name: 'project', params: { projectId: content.id }}">-->
<!--            <v-card-text>-->
<!--                {{ content.id }}-->
<!--            </v-card-text>-->
<!--        </router-link>-->

        <v-card-title>Новые категории:</v-card-title>
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

        <v-card-title>Новые размеры инвестиций:</v-card-title>
        <v-card-text>От {{ content.investmentMin }} руб.</v-card-text>
        <v-card-text>До {{ content.investmentMax }} руб.</v-card-text>

    </v-card>

</template>

<style scoped>

</style>