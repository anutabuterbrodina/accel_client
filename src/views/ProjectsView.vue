<script setup lang="ts">
import CardList from '../components/UI/CardList.vue'
import ProjectCard from '../components/ProjectCard.vue'
import FilterPanel from '../components/UI/FilterPanel.vue'
import ProjectForm from '../components/forms/ProjectForm.vue'
import Modal from '../components/UI/Modal.vue'
import { defineProps, onMounted, PropType, reactive, ref, watch } from "vue";
import { Project } from "@/core/entities/project";
import { useRoute, useRouter } from "vue-router";
import { useProjectStore } from "@/stores/project";
import { useFilterStore } from "@/stores/filter";
import { useAuthStore } from "@/stores/auth";
import { useModalStore } from "@/stores/modal";
import { useRequestStore } from "@/stores/request";

const { projectList, loadProjectsList, isListEmpty } = useProjectStore()
const { projectSortOptions, projectFilter, getProjectFilter, tags } = useFilterStore()
const { userId, showMembered} = useAuthStore()
const route = useRoute();
const router = useRouter();

const showMemberedProjects = ref(route.name === 'userProjects' && userId.value)

onMounted(async () => {
    loadProjectsList(getProjectFilter(), showMemberedProjects.value ? userId.value : null)
})

const getById = (id: string): Project => {
    return projectList.value.find( (project) => project.id === id )
}

watch(projectFilter, async () => {
    isListEmpty.value = false
    loadProjectsList(getProjectFilter(), showMemberedProjects.value ? userId.value : null)
})

const { setVisibility } = useModalStore()

const { createProjectRequest } = useRequestStore()
const { project } = useProjectStore()

const handleSubmit = async () => {
    createProjectRequest(
        userId.value,
        project.name,
        project.description,
        project.investmentMin,
        project.investmentMax,
        project.tags,
    ).then(() => router.push({ name: 'userRequests', params: { userId: userId.value } }))
}
</script>

<template>
    <v-container>
        <div class="text-center" v-if="showMemberedProjects">
            <h1>Мои проекты</h1>
        </div>
        <div class="text-center" v-else>
            <h1>Список проектов</h1>
        </div>
        <v-row class="mt-5">

            <FilterPanel>
                <div v-if="showMemberedProjects" class="px-4 mb-5">
                    <v-btn @click="setVisibility(true)" class="w-100" color="primary">Создать</v-btn>
                </div>
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

                    <router-link :to="{ name: 'project', params: { projectId: id } }">
                        <ProjectCard :project="getById(id)"/>
                    </router-link>

                </CardList>
            </v-col>
        </v-row>

        <Modal>
            <ProjectForm
                :action="'create'"
                @handleForm="handleSubmit"
            />
        </Modal>

    </v-container>
</template>

<style scoped>

</style>