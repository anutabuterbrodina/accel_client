<script setup lang="ts">
import CardList from './UI/CardList.vue'
import ProjectCard from './ProjectCard.vue'
import Sort from "@/components/UI/Sort.vue";
import SearchQuery from "@/components/UI/SearchQuery.vue";
import ProjectsListFilter from "@/components/ProjectsListFilter.vue";
import { Project } from "@/core/entities/project/project";
import { useRouter } from "vue-router";
import { useProjectsListStore } from "@/stores/projectsList";
import { Constants } from "@/core/static/constants";


const { projectsList } = useProjectsListStore()
const router = useRouter();

const getById = (id: string): Project => {
    return projectsList.value.find( (project) => project.id === id )
}
</script>

<template>
    <v-row class="mt-3">

        <v-col cols="3">
            <ProjectsListFilter />
        </v-col>

        <v-col>
            <div style="display: flex">
                <Sort
                    :sort-items="Constants.getSortOptionNames( Project.name )"
                    style="max-width: 215px"
                />
                <SearchQuery />
            </div>


            <div class="mb-5">
                <slot>

                </slot>
            </div>

            <CardList
                :list="projectsList"
                v-slot="{ id }"
            >
                <router-link :to="{ name: 'project', params: { projectId: id } }">
                    <ProjectCard :project="getById(id)"/>
                </router-link>
            </CardList>

        </v-col>
    </v-row>
</template>

<style scoped>

</style>