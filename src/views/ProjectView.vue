<script setup lang="ts">
import ProjectDetails from "@/components/ProjectDetails.vue";
import ProjectForm from "@/components/forms/ProjectForm.vue";
import Modal from "@/components/UI/Modal.vue";
import { onMounted, ref, toRaw } from "vue";
import { useProjectStore } from "@/stores/project";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";
import { useModalStore } from "@/stores/modal";
import { ProjectService } from "@/core/services/project.service";


const { currentUser } = useAuthStore()
const { setVisibility, refreshStore: refreshModalStore } = useModalStore()
const { project, loadProject } = useProjectStore()
const route = useRoute()

const formAction = ref('')
const isMember = ref(!!project.members?.includes(currentUser.id))

const handleSubmitForm = async () => {
    if (formAction.value === 'editCommonData') {
        await ProjectService.editCommonData(project)
    }

    if (formAction.value === 'editBusinessData') {
        // Формируем заявку RequestApi
    }

    console.log('Done')
    await refreshModalStore()
    await loadProject(<string> route.params.projectId)
}

</script>

<template >
    <v-container class="mt-5">

        <v-row v-if="isMember">
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