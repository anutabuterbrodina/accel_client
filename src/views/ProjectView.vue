<script setup lang="ts">
import ProjectDetails from "@/components/ProjectDetails.vue";
import { defineProps, reactive, ref } from "vue";
import Modal from "@/components/UI/Modal.vue";
import { User } from "@/core/entities/user/user";
import ProjectForm from "@/components/forms/ProjectForm.vue";
import { useRoute } from "vue-router";
import { useProjectStore } from "@/stores/project";
const currentUserId = 'user1'
const ifCurrentUserIsMember = () => currentUserId && project.membersList.includes(currentUserId)

const formAction = ref('')
const showEditForm = (action) => {
    formAction.value = action
}

</script>

<template >
    <v-container>
        <ProjectDetails
            :project="project"
            :members="members"
            :is-editable="ifCurrentUserIsMember()"
            @update="showEditForm"
        />
        <Modal>
            <ProjectForm
                :action="formAction"
            />
        </Modal>
    </v-container>
</template>

<style scoped>

</style>