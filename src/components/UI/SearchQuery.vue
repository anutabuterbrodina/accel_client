<script setup lang="ts">
import { useFilterStore } from "@/stores/filter";

const { searchQuery } = useFilterStore()
</script>

<template>
    <v-text-field
        v-model="searchQuery"
        placeholder="Поиск по ключевому слову"
        required
    ></v-text-field>
</template>

<style scoped>
</style>