<script setup lang="ts">
import FilterPanel from "@/components/UI/FilterPanel.vue";
import { Constants } from "@/core/static/constants";
import { useFilterStore } from "@/stores/filter";
import { ref } from "vue";


const { requestsFilters } = useFilterStore()

const selectedStatuses = ref([])
const reselect = () => {
    requestsFilters.statuses = Constants.getRequestStatusesValuesByNames( selectedStatuses.value )
}
</script>

<template>
    <FilterPanel>
        <v-select
            :items="Constants.getRequestStatusesNames()"
            v-model="selectedStatuses"
            @update:modelValue="reselect"
            label="Статус заявки"
            clearable
            chips
            multiple
        ></v-select>
    </FilterPanel>
</template>

<style scoped>

</style>