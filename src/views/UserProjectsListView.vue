<script setup lang="ts">
import ProjectsList from "@/components/ProjectsList.vue";
import ProjectForm from '../components/forms/ProjectForm.vue'
import Modal from '../components/UI/Modal.vue'
import { EUserRoles } from "@/core/entities/user/user-roles.enum";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { onMounted, watch } from "vue";
import { useProjectsListStore } from "@/stores/projectsList";
import { useModalStore } from "@/stores/modal";
import { useProjectStore } from "@/stores/project";
import { RequestService } from "@/core/services/request.service";
import { Request } from "@/core/entities/request/request";
import { ERequestTypes } from "@/core/entities/request/request-types.enum";
import { IRegisterProjectRequestContext } from "@/core/entities/request/register-project-request-context.interface";
import { useFilterStore } from "@/stores/filter";
import { useSortStore } from "@/stores/sort";


const { currentUser } = useAuthStore()
const { loadProjectsList } = useProjectsListStore()
const { sort, refreshStore: refreshSortStore } = useSortStore()
const { searchQuery, projectsFilters, refreshStore: refreshFilterStore } = useFilterStore()
const { setVisibility, refreshStore: refreshModalStore } = useModalStore()
const { project, refreshStore: refreshProjectStore } = useProjectStore()
const router = useRouter()

if (currentUser.role !== EUserRoles.COMMON_USER) {
    router.push('/')
}

const refreshStores = () => {
    refreshFilterStore()
    refreshModalStore()
    refreshProjectStore()
    refreshSortStore()
}

const handleSubmitForm = async () => {
    const content: IRegisterProjectRequestContext = {
        id: project.id || '',
        name: project.name,
        description: project.description,
        investmentMin: project.investmentMin,
        investmentMax: project.investmentMax,
        tags: project.tags,
    }

    RequestService.create( new Request(
        ERequestTypes.REGISTER_PROJECT,
        currentUser.id,
        currentUser.email,
        '',
        content,
    ))
        .then(() =>  {
            refreshStores()
            router.push({ name: 'userRequests', params: { userId: currentUser.id } })
        })

}

onMounted(async () => {
    await loadProjectsList(projectsFilters, currentUser.id, null, searchQuery.value, sort)
})

watch([projectsFilters, sort], async () => {
    await loadProjectsList(projectsFilters, currentUser.id, null, searchQuery.value, sort)
})
</script>

<template>
    <v-container class="mt-5">
        <div class="text-center">
            <h1>Мои проекты</h1>
        </div>

        <ProjectsList>
            <v-btn height="60" @click="setVisibility(true)" class="w-100" color="grey">Создать</v-btn>
        </ProjectsList>

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