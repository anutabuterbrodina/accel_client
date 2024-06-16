<script setup lang="ts">
import CardList from '../components/UI/CardList.vue'
import ProjectCard from '../components/ProjectCard.vue'
import FilterPanel from '../components/UI/FilterPanel.vue'
import ProjectForm from '../components/forms/ProjectForm.vue'
import Modal from '../components/UI/Modal.vue'
import { defineProps, onMounted, ref, watch } from "vue";
import { Project } from "@/core/entities/project";
import { useRoute, useRouter } from "vue-router";
import { useProjectStore } from "@/stores/project";
import { useAuthStore } from "@/stores/auth";
import { useModalStore } from "@/stores/modal";
import { RequestService } from "@/core/services/request.service";
import { Request } from "@/core/entities/request/request";
import { ERequestTypes } from "@/core/entities/request/request-types.enum";
import { useProjectsListStore } from "@/stores/projectsList";
import { Constants } from "@/core/static/constants";


const { currentUser } = useAuthStore()
const { projectsList, projectsFilters, refreshStore } = useProjectsListStore()
const { setVisibility } = useModalStore()
const { project } = useProjectStore()
const router = useRouter();
const props = defineProps({
    isMemberedProjectsList: {
        type: Boolean,
        default: false,
    }
})

onMounted(async () => {
    await refreshStore(props.isMemberedProjectsList ? currentUser.id : null)
})

watch(projectsFilters, async () => {
    await refreshStore(props.isMemberedProjectsList ? currentUser.id : null)
})

const getById = (id: string): Project => {
    return projectsList.value.find( (project) => <string> project.id === id )
}

const handleSubmitForm = async () => {
    RequestService.create( new Request(
        ERequestTypes.REGISTER_PROJECT,
        currentUser.id,
        currentUser.email,
        '',
        project,
    ))
        .then(() => router.push(
            { name: 'userRequests', params: { userId: currentUser.id } }
        ))
}
</script>

<template>
    <v-container>
        <div class="text-center" v-if="isMemberedProjectsList">
            <h1>Мои проекты</h1>
        </div>
        <div class="text-center" v-else>
            <h1>Список проектов</h1>
        </div>
        <v-row class="mt-5">

            <FilterPanel>
                <div v-if="isMemberedProjectsList" class="px-4 mb-5">
                    <v-btn @click="setVisibility(true)" class="w-100" color="primary">Создать</v-btn>
                </div>
                <v-form>
                    <v-container class="mt-0 pt-0">
                        <v-select
                            label="Выберите категорию"
                            clearable
                            v-model="projectsFilters.tags"
                            :items="Constants.getTagsNames()"
                            chips
                            flat
                            multiple
                        ></v-select>

                        <v-text-field
                            v-model="projectsFilters.investmentMin"
                            label="Мин. размер инвестиций"
                            clearable
                        ></v-text-field>

                        <v-text-field
                            v-model="projectsFilters.investmentMax"
                            label="Макс. размер инвестиций"
                            clearable
                        ></v-text-field>
                    </v-container>
                </v-form>
            </FilterPanel>

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

        <Modal>
            <ProjectForm
                :action="'create'"
                @formAction="handleSubmitForm"
            />
        </Modal>

    </v-container>
</template>

<style scoped>

</style>