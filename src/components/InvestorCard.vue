<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { Investor } from "@/core/entities/investor";

defineProps( {
    investor: Object as PropType<Investor>,
} )

const reduct = (str: string) => str.substring( 0, 50 ) + '...'
</script>

<template>
    <v-card
        class="mx-auto my-8"
        elevation="16"
        max-width="100%"
    >
        <v-card-item>
            <v-card-title>
                {{ investor.name }}
            </v-card-title>

            <v-card-subtitle>
                {{ investor.type }}
            </v-card-subtitle>
        </v-card-item>

        <v-card-text>
            {{ reduct( investor.description ) }}
        </v-card-text>

        <v-chip
            v-for="tag in investor.tagsList"
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