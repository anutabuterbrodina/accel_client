<script setup lang="ts">
import FilterPanel from "@/components/UI/FilterPanel.vue";
import { Constants } from "@/core/static/constants";
import { useFilterStore } from "@/stores/filter";

const { projectsFilters } = useFilterStore()
</script>

<template>
    <FilterPanel>
        <v-select
            v-model="projectsFilters.tags"
            :items="Constants.getTagsNames()"
            label="Выберите категорию"
            clearable
            chips
            multiple
        ></v-select>

        <v-text-field
            v-model="projectsFilters.investmentMin"
            label="Мин. размер инвестиций"
            clearable
        ></v-text-field>

        <v-text-field
            v-model="projectsFilters.investmentMax"
            label="Макс. размер инвестиций"
            clearable
        ></v-text-field>
    </FilterPanel>
</template>

<style scoped>

</style>