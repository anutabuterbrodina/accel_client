<script setup lang="ts">
import InvestorsList from "@/components/InvestorsList.vue";
import Modal from "@/components/UI/Modal.vue";
import InvestorForm from "@/components/forms/InvestorForm.vue";
import { onMounted, watch } from "vue";
import { useFilterStore } from "@/stores/filter";
import { useSortStore } from "@/stores/sort";
import { useInvestorsListStore } from "@/stores/investorsList";
import { useAuthStore } from "@/stores/auth";
import { useModalStore } from "@/stores/modal";
import { useRouter } from "vue-router";
import { EUserRoles } from "@/core/entities/user/user-roles.enum";
import { useInvestorStore } from "@/stores/investor";
import { RequestService } from "@/core/services/request.service";
import { Request } from "@/core/entities/request/request";
import { ERequestTypes } from "@/core/entities/request/request-types.enum";
import type { IRegisterInvestorRequestContext } from "@/core/entities/request/register-investor-request-context.interface";


const { currentUser } = useAuthStore()
const { loadInvestorsList } = useInvestorsListStore()
const { investor, refreshStore: refreshInvestorStore } = useInvestorStore()
const { sort, refreshStore: refreshSortStore } = useSortStore()
const { searchQuery, investorsFilters, refreshStore: refreshFilterStore } = useFilterStore()
const { setVisibility, refreshStore: refreshModalStore } = useModalStore()
const router = useRouter()

if (currentUser.role !== EUserRoles.COMMON_USER) {
    router.push('/')
}

const refreshStores = () => {
    refreshFilterStore()
    refreshModalStore()
    refreshInvestorStore()
    refreshSortStore()
}

const handleSubmitForm = async () => {
    const content: IRegisterInvestorRequestContext = {
        id: investor.id || '',
        name: investor.name,
        type: investor.type,
        description: investor.description,
        requisites: investor.requisites,
        tags: investor.interests,
    }

    RequestService.create( new Request(
        ERequestTypes.REGISTER_INVESTOR,
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
    await loadInvestorsList(investorsFilters, currentUser.id, searchQuery.value, sort)
    refreshInvestorStore()
})

watch([investorsFilters, searchQuery, sort], async () => {
    await loadInvestorsList(investorsFilters, currentUser.id, searchQuery.value, sort)
})
</script>

<template>
    <v-container class="mt-5">
        <div class="text-center">
            <h1>Мои инвесторы</h1>
        </div>

        <InvestorsList>
            <v-btn height="60" @click="setVisibility(true)" class="w-100" color="grey">Создать</v-btn>
        </InvestorsList>

        <Modal>
            <InvestorForm
                :action="'create'"
                @formAction="handleSubmitForm"
            />
        </Modal>

    </v-container>
</template>

<style scoped>

</style>