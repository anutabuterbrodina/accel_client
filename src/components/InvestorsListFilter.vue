<script setup lang="ts">
import FilterPanel from "@/components/UI/FilterPanel.vue";
import { Constants } from "@/core/static/constants";
import { useFilterStore } from "@/stores/filter";
import { ref } from "vue";


const { investorsFilters } = useFilterStore()

const selectedTypes = ref([])
const reselect = () => {
    investorsFilters.types = Constants.getInvestorTypesValuesByNames( selectedTypes.value )
}
</script>

<template>
    <FilterPanel>
        <v-select
            v-model="investorsFilters.interests"
            :items="Constants.getTagsNames()"
            label="Выберите категорию"
            clearable
            chips
            multiple
        ></v-select>

        <v-select
            :items="Constants.getInvestorTypesNames()"
            v-model="investorsFilters.types"
            @update:modelValue="reselect"
            label="Выберите тип инвестора"
            clearable
            chips
            multiple
        ></v-select>
    </FilterPanel>
</template>

<style scoped>

</style>