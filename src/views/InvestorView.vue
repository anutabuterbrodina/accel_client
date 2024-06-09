<script setup lang="ts">
import { reactive, ref } from "vue";
import Modal from "@/components/UI/Modal.vue";
import { User } from "@/core/entities/user";
import { Investor } from "@/core/entities/investor";
import InvestorForm from "@/components/forms/InvestorForm.vue";
import InvestorDetails from "@/components/InvestorDetails.vue";

const investor = reactive(new Investor(
    '1',
    'Investor 1',
    'Investor 1 bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ',
    ['Тег 1', 'Тег 2', 'Тег 3'],
    ['user1', 'user2', 'user3'],
    'Юридическое лицо'
));

const members = ref([
    new User('user1', 'User 1', 'Test', 'user', 'test1@test.com', '81234567891'),
    new User('user2', 'User 2', 'Test', 'user', 'test2@test.com', '81234567892'),
    new User('user3', 'User 3', 'Test', 'user', 'test3@test.com', '81234567893'),
])

const currentUserId = 'user1'
const ifCurrentUserIsMember = () => currentUserId && investor.members.includes(currentUserId)

const formAction = ref('')
const showEditForm = (action) => {
    formAction.value = action
}

</script>

<template>
    <v-container>
        <InvestorDetails
            :investor="investor"
            :members="members"
            :is-editable="ifCurrentUserIsMember()"
            @update="showEditForm"
        />
        <Modal>
            <InvestorForm
                :action="formAction"
            />
        </Modal>
    </v-container>
</template>

<style scoped>

</style>