<script setup lang="ts">
import CardList from '../components/UI/CardList.vue'
import FilterPanel from '../components/UI/FilterPanel.vue'
import { defineProps, onMounted, PropType, reactive, ref, watch } from "vue";
import { Investor } from "@/core/entities/investor";
import InvestorCard from "@/components/InvestorCard.vue";
import { useRoute } from "vue-router";
import { useFilterStore } from "@/stores/filter";
import { useInvestorStore } from "@/stores/investor";


const route = useRoute();
const { investorsList, loadInvestorsList, isListEmpty } = useInvestorStore()
const { investorSortOptions, investorFilter, getInvestorFilter, investorTypes, tags } = useFilterStore()

const userCriteria = <String> route.params?.userId

onMounted(async () => {
    loadInvestorsList(getInvestorFilter(), userCriteria)
})

const getById = (id: string): Investor => {
    return investorsList.value.find( (investor) => investor.id === id )
}

watch(investorFilter, async () => {
    isListEmpty.value = false
    loadInvestorsList(getInvestorFilter(), userCriteria)
})
</script>

<template>
    <v-container>
        <div class="text-center">
            <h1>Список инвесторов</h1>
        </div>
        <v-row class="mt-5">
            <FilterPanel>
                <v-form>
                    <v-container class="mt-0 pt-0">
                        <v-select
                            label="Выберите категорию"
                            clearable
                            v-model="investorFilter.tags"
                            :items="tags"
                            chips
                            flat
                            multiple
                        ></v-select>

                        <v-select
                            label="Выберите тип инвестора"
                            clearable
                            v-model="investorFilter.types"
                            :items="investorTypes"
                            chips
                            flat
                            multiple
                        ></v-select>
                    </v-container>
                </v-form>
            </FilterPanel>

            <v-col>
                <div>
                    <v-select
                        v-model="investorFilter.sortOption"
                        :items="investorSortOptions"
                    ></v-select>
                    <v-text-field
                        v-model="investorFilter.nameSearchString"
                        placeholder="Поиск по ключевому слову"
                        required
                    ></v-text-field>
                </div>

                <div v-if="isListEmpty">
                    <h1>По данным критериям ничего не найдено</h1>
                </div>
                <CardList
                    v-else
                    :list="investorsList"
                    v-slot="{ id }"
                >
                    <InvestorCard
                        :investor="getById(id)"
                    />
                </CardList>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>

</style>