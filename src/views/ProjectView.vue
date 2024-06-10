<script setup lang="ts">
import ProjectDetails from "@/components/ProjectDetails.vue";
import { reactive, ref } from "vue";
import { Project } from "@/core/entities/project";
import Modal from "@/components/UI/Modal.vue";
import { User } from "@/core/entities/user";
import ProjectForm from "@/components/forms/ProjectForm.vue";
import { useRoute } from "vue-router";

const project = reactive(new Project(
    '88016cb3-3c1b-4caf-a2b3-3164649e3319',
    'Project 1',
    'Project 1 bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ',
    ['Тег 1', 'Тег 2', 'Тег 3'],
    100000,
    5000000,
    Date.now(),
    ['user1', 'user2', 'user3'],
    'user1',
));

const members = ref([
    new User('user1', 'User 1', 'Test', 'user', 'test1@test.com', '81234567891'),
    new User('user2', 'User 2', 'Test', 'user', 'test2@test.com', '81234567892'),
    new User('user3', 'User 3', 'Test', 'user', 'test3@test.com', '81234567893'),
    new User('user4', 'User 4', 'Test', 'user', 'test4@test.com', '81234567894'),
])

const currentUserId = 'user1'
const ifCurrentUserIsMember = () => currentUserId && project.membersList.includes(currentUserId)

const formAction = ref('')
const showEditForm = (action) => {
    formAction.value = action
}


const route = useRoute();

</script>

<template >
    <v-container v-if="route.params?.projectId === '88016cb3-3c1b-4caf-a2b3-3164649e3319'">
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