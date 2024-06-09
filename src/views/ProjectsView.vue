<script setup lang="ts">
import CardList from '../components/UI/CardList.vue'
import ProjectCard from '../components/ProjectCard.vue'
import FilterPanel from '../components/UI/FilterPanel.vue'
import { defineProps, PropType, reactive, ref } from "vue";
import { Project } from "@/core/entities/project";
import { Investor } from "@/core/entities/investor";
import { useRoute } from "vue-router";

const rawProjectList = ref(
    [
        new Project(
            '1',
            'Project 1',
            'Project 1 bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ',
            ['Тег 1', 'Тег 2', 'Тег 3'],
            100000,
            5000000,
            'user1',
            ['user1', 'user2', 'user3'],
        ),
        new Project(
            '1',
            'Project 1',
            'Project 1 bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ',
            ['Тег 1', 'Тег 2', 'Тег 3'],
            100000,
            5000000,
            'user2',
            ['user2', 'user2', 'user3'],
        ),
        new Project(
            '1',
            'Project 1',
            'Project 1 bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ',
            ['Тег 1', 'Тег 2', 'Тег 3'],
            100000,
            5000000,
            'user3',
            ['user3', 'user3', 'user3'],
        ),
    ]
);

const route = useRoute();
const currentUserId = <String> route.params?.userId

const projectList = ref( rawProjectList.value.filter(project =>
        currentUserId && project.members.includes(currentUserId)
    )
)

const getById = (id: string): Project => {
    return projectList.value.find( (project) => project.id === id )
}

const tags = ['tag 1', 'tag 2', 'tag 3']

const filter = reactive({
    searchQuery: '',
    sortOrder: 'ASC',
    sortOption: 'По умолчанию',
    tag: [],
    requiredInvestmentMin: null as Number,
    requiredInvestmentMax: null as Number,
});
</script>

<template>
    <v-container>
        <div class="text-center">
            <h1>Список проектов</h1>
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

                        <v-text-field
                            v-model="filter.requiredInvestmentMin"
                            label="Мин. размер инвестиций"
                            clearable
                        ></v-text-field>

                        <v-text-field
                            v-model="filter.requiredInvestmentMax"
                            label="Макс. размер инвестиций"
                            clearable
                        ></v-text-field>
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
                    :list="projectList"
                    v-slot="{ id }"
                >
                    <ProjectCard
                        :project="getById(id)"
                    />
                </CardList>
            </v-col>
        </v-row>



    </v-container>
</template>

<style scoped>

</style>