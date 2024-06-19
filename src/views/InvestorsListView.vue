<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useFilterStore } from "@/stores/filter";
import InvestorsList from "@/components/InvestorsList.vue";
import { useSortStore } from "@/stores/sort";
import { useInvestorsListStore } from "@/stores/investorsList";


const { loadInvestorsList } = useInvestorsListStore()
const { sort } = useSortStore()
const { searchQuery, investorsFilters } = useFilterStore()

onMounted(async () => {
    await loadInvestorsList(investorsFilters, null, searchQuery.value, sort)
})

watch([investorsFilters, searchQuery, sort], async () => {
    await loadInvestorsList(investorsFilters, null, searchQuery.value, sort)
})
</script>

<template>
    <v-container class="mt-5">
        <div class="text-center">
            <h1>Список инвесторов</h1>
        </div>

        <InvestorsList/>

    </v-container>
</template>

<style scoped>

</style>