<script setup lang="ts">
import { computed, ref, toRaw } from "vue";
import Modal from "@/components/UI/Modal.vue";
import InvestorForm from "@/components/forms/InvestorForm.vue";
import InvestorDetails from "@/components/InvestorDetails.vue";
import { useInvestorStore } from "@/stores/investor";
import { useAuthStore } from "@/stores/auth";
import { useModalStore } from "@/stores/modal";
import { useRoute, useRouter } from "vue-router";
import { InvestorService } from "@/core/services/investor.service";
import { InvestorApi } from "@/api/investor.api";
import { RequestService } from "@/core/services/request.service";
import { Request } from "@/core/entities/request/request";
import { ERequestTypes } from "@/core/entities/request/request-types.enum";
import {
    IChangeInvestorRequisitesRequestContext
} from "@/core/entities/request/change-investor-requisites-request-context.interface";


const { currentUser } = useAuthStore()
const { setVisibility, refreshStore: refreshModalStore } = useModalStore()
const { investor, loadInvestor } = useInvestorStore()
const route = useRoute()
const router = useRouter()

const formAction = ref('')

const isMember = computed(() => !!investor.members?.includes(currentUser.id))
const isOwner = computed(() => investor.ownerId === currentUser.id)

const handleSubmitForm = async () => {
    if (formAction.value === 'editCommonData') {
        await InvestorService.editCommonData(investor)

        await refreshModalStore()
        await loadInvestor(<string> route.params.investorId)
    }

    if (formAction.value === 'editInterests') {
        await InvestorService.editInterests(investor.id || '', toRaw(investor.interests))

        await refreshModalStore()
        await loadInvestor(<string> route.params.investorId)
    }

    if (formAction.value === 'editBusinessData') {
        const content: IChangeInvestorRequisitesRequestContext = {
            id: investor.id || '',
            type: investor.type,
            requisites: investor.requisites,
        }

        await RequestService.create( new Request(
            ERequestTypes.CHANGE_INVESTOR_REQUISITES,
            currentUser.id,
            currentUser.email,
            '',
            content,
        ))

        await refreshModalStore()
        await loadInvestor(<string> route.params.investorId)
        await router.push({ name: 'userRequests', params: { userId: currentUser.id } })
    }


}

const deactivate = async () => {
    await InvestorApi.deactivate(<string> route.params.investorId)
    await loadInvestor(<string> route.params.investorId)
}

const activate = async () => {
    await InvestorApi.activate(<string> route.params.investorId)
    await loadInvestor(<string> route.params.investorId)
}
</script>

<template >
    <v-container class="mt-5">

        <v-btn class="mb-5" @click="deactivate" v-if="investor.isActive && isOwner">Деактивировать</v-btn>
        <v-btn class="mb-5" @click="activate" v-if="!investor.isActive && isOwner">Активировать</v-btn>
        <v-card v-if="!investor.isActive">
            <v-card-title class="bg-red-darken-3">
                Инвестор деактивирован и не показывается в общей выдаче
            </v-card-title>
        </v-card>

        <v-row v-if="isMember && investor.isActive">
<!--            <v-row>-->
            <v-col>
                <v-btn size="small" @click="() => { formAction = 'editCommonData'; setVisibility(true) }" color="primary">Редактирвоать описание</v-btn>
            </v-col>
            <v-col>
                <v-btn size="small" @click="() => { formAction = 'editInterests'; setVisibility(true) }" color="primary">Редактирвоать категории</v-btn>
            </v-col>
            <v-col>
                <v-btn size="small" @click="() => { formAction = 'editBusinessData'; setVisibility(true) }" color="primary">Редактирвоать бизнесс-данные</v-btn>
            </v-col>
        </v-row>

        <InvestorDetails>

        </InvestorDetails>

        <Modal>
            <InvestorForm
                :action="formAction"
                @formAction="handleSubmitForm"
            />
        </Modal>
    </v-container>
</template>

<style scoped>

</style>