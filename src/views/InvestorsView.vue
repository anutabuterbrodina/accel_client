<script setup lang="ts">
import CardList from '../components/UI/CardList.vue'
import FilterPanel from '../components/UI/FilterPanel.vue'
import { defineProps, PropType, reactive, ref } from "vue";
import { Investor } from "@/core/entities/investor";
import InvestorCard from "@/components/InvestorCard.vue";
import { useRoute } from "vue-router";

const rawInvestorsList = ref(
    [
        new Investor(
            '1',
            'Investor 1',
            'Investor 1 bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ',
            ['Тег 1', 'Тег 2', 'Тег 3'],
            ['user1', 'user2', 'user3'],
            'Юридическое лицо'
        ),
        new Investor(
            '1',
            'Investor 1',
            'Investor 1 bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ',
            ['Тег 1', 'Тег 2', 'Тег 3'],
            ['user2', 'user2', 'user3'],
            'Индивидуальный предприниматель'
        ),
        new Investor(
            '1',
            'Investor 1',
            'Investor 1 bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ',
            ['Тег 1', 'Тег 2', 'Тег 3'],
            ['user3', 'user3', 'user3'],
            'Физическое лицо'
        )
    ]
);

const route = useRoute();
const currentUserId = <String> route.params?.userId

const investorsList = ref( rawInvestorsList.value.filter(investor =>
        currentUserId && investor.members.includes(currentUserId)
    )
)

const getById = (id: string): Investor => {
    return investorsList.value.find( (investor) => investor.id === id )
}

const tags = ['tag 1', 'tag 2', 'tag 3']

const types = ['Физическое лицо', 'Индивидуальный предприниматель', 'Юридическое лицо']

const filter = reactive({
    searchQuery: '',
    sortOrder: 'ASC',
    sortOption: 'По умолчанию',
    tag: [],
    type: null
});
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
                            v-model="filter.tags"
                            :items="tags"
                            chips
                            flat
                            multiple
                        ></v-select>


                        <v-select
                            label="Выберите тип инвестора"
                            clearable
                            v-model="filter.type"
                            :items="types"
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
                        v-model="filter.sortOption"
                        :items="['Сначала новые', 'Сначала старые', 'По умолчанию']"
                    ></v-select>
                    <v-text-field
                        v-model="filter.searchQuery"
                        placeholder="Поиск по ключевому слову"
                        required
                    ></v-text-field>
                </div>

                <CardList
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