<script setup lang="ts">
import CardList from './UI/CardList.vue'
import Sort from "@/components/UI/Sort.vue";
import SearchQuery from "@/components/UI/SearchQuery.vue";
import InvestorsListFilter from "@/components/InvestorsListFilter.vue";
import { useRouter } from "vue-router";
import { Constants } from "@/core/static/constants";
import { Investor } from "@/core/entities/investor/investor";
import { useInvestorsListStore } from "@/stores/investorsList";
import InvestorCard from "@/components/InvestorCard.vue";


const { investorsList } = useInvestorsListStore()
const router = useRouter();

const getById = (id: string): Investor => {
    return investorsList.value.find( (investor) => investor.id === id )
}
</script>

<template>
    <v-row class="mt-3">

        <v-col cols="3">
            <InvestorsListFilter />
        </v-col>

        <v-col>
            <div style="display: flex">
                <Sort
                    :sort-items="Constants.getSortOptionNames( Investor.name )"
                    style="max-width: 215px"
                />
                <SearchQuery />
            </div>


            <div class="mb-5">
                <slot>

                </slot>
            </div>

            <CardList
                :list="investorsList"
                v-slot="{ id }"
            >
                <router-link :to="{ name: 'investor', params: { investorId: id } }">
                    <InvestorCard :investor="getById(id)"/>
                </router-link>
            </CardList>

        </v-col>
    </v-row>
</template>

<style scoped>

</style>