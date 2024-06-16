<script setup lang="ts">
import CardList from '../components/UI/CardList.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { defineProps, onMounted, ref, watch } from "vue";
import { Project } from "@/core/entities/project";
import { useRoute, useRouter } from "vue-router";
import { useProjectStore } from "@/stores/project";
import { useAuthStore } from "@/stores/auth";
import { useProjectsListStore } from "@/stores/projectsList";
import { Constants } from "@/core/static/constants";
import { ProjectApi } from "@/api/project/project.api";


const { currentUser } = useAuthStore()
const { projectsList, projectsFilters, refreshStore } = useProjectsListStore()
const { project } = useProjectStore()
const router = useRouter();
const bookmarks = await ProjectApi.getBookmarks(currentUser.id)

onMounted(async () => {
    await refreshStore(null, bookmarks)
})

watch(projectsFilters, async () => {
    await refreshStore(null, bookmarks)
})

const getById = (id: string): Project => {
    return projectsList.value.find( (project) => <string> project.id === id )
}
</script>

<template>
    <v-container>
        <div class="text-center">
            <h1>Список закладок</h1>
        </div>
        <v-row class="mt-5">

<!--            <FilterPanel>-->
<!--                <v-form>-->
<!--                    <v-container class="mt-0 pt-0">-->
<!--                        <v-select-->
<!--                            label="Выберите категорию"-->
<!--                            clearable-->
<!--                            v-model="projectsFilters.tags"-->
<!--                            :items="Constants.getTagsNames()"-->
<!--                            chips-->
<!--                            flat-->
<!--                            multiple-->
<!--                        ></v-select>-->

<!--                        <v-text-field-->
<!--                            v-model="projectsFilters.investmentMin"-->
<!--                            label="Мин. размер инвестиций"-->
<!--                            clearable-->
<!--                        ></v-text-field>-->

<!--                        <v-text-field-->
<!--                            v-model="projectsFilters.investmentMax"-->
<!--                            label="Макс. размер инвестиций"-->
<!--                            clearable-->
<!--                        ></v-text-field>-->
<!--                    </v-container>-->
<!--                </v-form>-->
<!--            </FilterPanel>-->

            <v-col>
                <div>
                    <v-select
                        v-model="projectsFilters.sortOption"
                        :items="Constants.getSortOptionNames( Project.name )"
                    ></v-select>
                    <v-text-field
                        v-model="projectsFilters.nameSearchString"
                        placeholder="Поиск по ключевому слову"
                        required
                    ></v-text-field>
                </div>
                <div v-if="projectsList.length === 0">
                    <h1>По данным критериям ничего не найдено</h1>
                </div>
                <CardList
                    v-else
                    :list="projectsList"
                    v-slot="{ id }"
                >

                    <router-link :to="{ name: 'project', params: { projectId: id } }">
                        <ProjectCard :project="getById(id)"/>
                    </router-link>

                </CardList>
            </v-col>
        </v-row>

    </v-container>
</template>

<style scoped>

</style>