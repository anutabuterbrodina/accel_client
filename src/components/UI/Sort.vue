<script setup lang="ts">
import { defineProps, ref } from "vue";
import { Sorter } from "@/core/helpers/sorter";
import { useSortStore } from "@/stores/sort";


const props = defineProps({
    sortItems: {
        type: Array,
        required: true,
    },
})

const { sort } = useSortStore()

const selectedSortItem = ref('По умолчанию')
const resort = () => {
    const { sortOption, sortOrder } = Sorter.getSortByName(selectedSortItem.value)
    sort.sortOption = sortOption
    sort.sortOrder = sortOrder
}
</script>

<template>
    <v-select
        :items="sortItems"
        v-model="selectedSortItem"
        @update:modelValue="resort"
    ></v-select>
</template>

<style scoped>

</style>