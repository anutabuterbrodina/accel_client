<script setup lang="ts">

import { useRequestStore } from "@/stores/request";
import { IRegisterProjectRequestContext } from "@/core/entities/request/register-project-request-context.interface";

const { request } = useRequestStore()
const content = <IRegisterProjectRequestContext> request.content
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

        <v-card-title>Размер инвестиций:</v-card-title>
        <v-card-text>От {{ content.investmentMin }} руб.</v-card-text>
        <v-card-text>До {{ content.investmentMax }} руб.</v-card-text>

    </v-card>

</template>

<style scoped>

</style>