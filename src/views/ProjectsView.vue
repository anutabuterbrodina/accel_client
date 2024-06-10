<script setup lang="ts">
import CardList from '../components/UI/CardList.vue'
import ProjectCard from '../components/ProjectCard.vue'
import FilterPanel from '../components/UI/FilterPanel.vue'
import { defineProps, onMounted, PropType, reactive, ref, watch } from "vue";
import { Project } from "@/core/entities/project";
import { useRoute } from "vue-router";
import { useProjectStore } from "@/stores/project";
import { useFilterStore } from "@/stores/filter";

const route = useRoute();
const { projectList, loadProjectsList, isListEmpty } = useProjectStore()
const { projectSortOptions, projectFilter, getProjectFilter, tags } = useFilterStore()

const userCriteria = <String> route.params?.userId

onMounted(async () => {
    loadProjectsList(getProjectFilter(), userCriteria)
})

const getById = (id: string): Project => {
    return projectList.value.find( (project) => project.id === id )
}

watch(projectFilter, async () => {
    isListEmpty.value = false
    loadProjectsList(getProjectFilter(), userCriteria)
})

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
                            v-model="projectFilter.tags"
                            :items="tags"
                            chips
                            flat
                            multiple
                        ></v-select>

                        <v-text-field
                            v-model="projectFilter.investmentMin"
                            label="Мин. размер инвестиций"
                            clearable
                        ></v-text-field>

                        <v-text-field
                            v-model="projectFilter.investmentMax"
                            label="Макс. размер инвестиций"
                            clearable
                        ></v-text-field>
                    </v-container>
                </v-form>
            </FilterPanel>

            <v-col>
                <div>
                    <v-select
                        v-model="projectFilter.sortOption"
                        title="sdf"
                        :items="projectSortOptions"
                    ></v-select>
                    <v-text-field
                        v-model="projectFilter.nameSearchString"
                        placeholder="Поиск по ключевому слову"
                        required
                    ></v-text-field>
                </div>

                <div v-if="isListEmpty">
                    <h1>По данным критериям ничего не найдено</h1>
                </div>
                <CardList
                    v-else
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