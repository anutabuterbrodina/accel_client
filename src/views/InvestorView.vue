<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import Modal from "@/components/UI/Modal.vue";
import InvestorForm from "@/components/forms/InvestorForm.vue";
import InvestorDetails from "@/components/InvestorDetails.vue";
import { useInvestorStore } from "@/stores/investor";
import { useUserStore } from "@/stores/user";

const { investor, loadInvestor, isListEmpty } = useInvestorStore()
const { usersList, loadUsersList } = useUserStore()

onMounted(async () => {
    await loadInvestor()
    loadUsersList(investor.membersList)
})

const currentUserId = 'user1'
const ifCurrentUserIsMember = () => currentUserId && investor.membersList.includes(currentUserId)

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