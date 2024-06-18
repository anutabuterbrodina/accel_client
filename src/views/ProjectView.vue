<script setup lang="ts">
import ProjectDetails from "@/components/ProjectDetails.vue";
import ProjectForm from "@/components/forms/ProjectForm.vue";
import Modal from "@/components/UI/Modal.vue";
import { computed, ref } from "vue";
import { useProjectStore } from "@/stores/project";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import { useModalStore } from "@/stores/modal";
import { ProjectService } from "@/core/services/project.service";
import { ProjectApi } from "@/api/project/project.api";
import { EProjectStatuses } from "@/core/entities/project/project-statuses.enum";
import { EUserAccountTypes } from "@/core/entities/user/user-account-types.enum";
import { RequestService } from "@/core/services/request.service";
import { ERequestTypes } from "@/core/entities/request/request-types.enum";
import {
    IChangeProjectBusinessDataRequestContext
} from "@/core/entities/request/change-project-business-data-request-context.interface";
import { Request } from "@/core/entities/request/request";


const { currentUser } = useAuthStore()
const { setVisibility, refreshStore: refreshModalStore } = useModalStore()
const { project, loadProject } = useProjectStore()
const route = useRoute()
const router = useRouter()

const formAction = ref('')

const isMember = computed(() => !!project.members?.includes(currentUser.id))
const isOwner = computed(() => project.ownerId === currentUser.id)

const handleSubmitForm = async () => {
    if (formAction.value === 'editCommonData') {
        await ProjectService.editCommonData(project)

        await refreshModalStore()
        await loadProject(<string> route.params.projectId)
    }

    if (formAction.value === 'editBusinessData') {
        const content: IChangeProjectBusinessDataRequestContext = {
            id: project.id || '',
            investmentMin: project.investmentMin,
            investmentMax: project.investmentMax,
            tags: project.tags,
        }

        await RequestService.create( new Request(
            ERequestTypes.CHANGE_PROJECT_BUSINESS_DATA,
            currentUser.id,
            currentUser.email,
            '',
            content,
        ))

        await refreshModalStore()
        await loadProject(<string> route.params.projectId)
        await router.push({ name: 'userRequests', params: { userId: currentUser.id } })
    }
}

const archive = async () => {
    await ProjectApi.archive(<string> route.params.projectId)
    await loadProject(<string> route.params.projectId)
}

const unarchive = async () => {
    await ProjectApi.unarchive(<string> route.params.projectId)
    await loadProject(<string> route.params.projectId)
}

const addBookmark = async () => {
    await ProjectApi.addBookmark(currentUser.id, <string> route.params.projectId)
}
</script>

<template >
    <v-container class="mt-5">

        <v-btn class="mb-5" @click="archive" v-if="project.status !== EProjectStatuses.ARCHIVED && isOwner">Архивировать</v-btn>
        <v-btn class="mb-5" @click="unarchive" v-if="project.status === EProjectStatuses.ARCHIVED && isOwner">Разархивировать</v-btn>
        <v-card v-if="project.status === EProjectStatuses.ARCHIVED">
            <v-card-title class="bg-red-darken-3">
                Проект архивирован и не показывается в общей выдаче
            </v-card-title>
        </v-card>

        <v-btn color="brown" size="small" @click="addBookmark" v-if="currentUser.type === EUserAccountTypes.INVESTOR">В избранное</v-btn>

        <v-row v-if="isMember && project.status !== EProjectStatuses.ARCHIVED">
<!--        <v-row>-->
            <v-col>
                <v-btn @click="() => { formAction = 'editCommonData'; setVisibility(true) }" color="primary">Редактирвоать описание</v-btn>
            </v-col>
            <v-col cols="5">
                <v-btn @click="() => { formAction = 'editBusinessData'; setVisibility(true) }" color="primary">Редактирвоать бизнесс-данные</v-btn>
            </v-col>
        </v-row>

        <ProjectDetails

        >

        </ProjectDetails>

        <Modal>
            <ProjectForm
                :action="formAction"
                @formAction="handleSubmitForm"
            />
        </Modal>
    </v-container>
</template>

<style scoped>

</style>