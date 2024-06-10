<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { Project } from "@/core/entities/project";

defineProps({
    project: Object as PropType<Project>,
})

const reduct = (str: string) => str.substring(0, 50) + '...'
</script>

<template>
    <v-card
        class="mx-auto my-8"
        elevation="16"
        max-width="100%"
    >
        <v-card-item>
            <v-card-title>
                {{ project.name }}
            </v-card-title>
        </v-card-item>

        <v-card-text>
            {{ reduct(project.description) }}
        </v-card-text>

        <v-card-item>
            <v-card-title>
                От {{ project.investmentMin }} руб. до {{ project.investmentMax }} руб.
            </v-card-title>
        </v-card-item>

        <v-chip
            v-for="tag in project.tagsList"
            class="ma-2"
            color="pink"
            label
            text-color="white"
        >
            <v-icon start icon="mdi-label"></v-icon>
            {{ tag }}
        </v-chip>

    </v-card>
</template>

<style scoped>

</style>