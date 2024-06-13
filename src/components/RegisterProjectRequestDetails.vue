<script setup lang="ts">
import { defineProps, PropType, } from "vue";
import { Request } from "@/core/entities/request";
import { request } from "axios";
import { useRequestStore } from "@/stores/request";

const { request } = useRequestStore()

</script>

<template>
    <v-card v-if="request">
    </v-card>
</template>

<style scoped>

</style>