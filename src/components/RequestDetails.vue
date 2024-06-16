<script setup lang="ts">
import { useRequestStore } from "@/stores/request";
import { defineProps, onMounted } from "vue";
import { ERequestStatuses } from '@/core/entities/request/request-statuses.enum.js';
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { RequestApi } from "@/api/request/request.api";
import Modal from "@/components/UI/Modal.vue";
import RequestRejectForm from "@/components/forms/RequestRejectForm.vue";
import { useModalStore } from "@/stores/modal";

const { currentUser } = useAuthStore()
const { request, refreshStore } = useRequestStore()
const { setVisibility } = useModalStore()
const route = useRoute()

const requestId = <string> route.params.requestId

onMounted(async () => {
    await refreshStore(requestId)
    setVisibility(false)
})

defineProps({
    isModerator: Boolean,
})

const accept = async () => {
    await RequestApi.accept(requestId, currentUser.id)
}

const reject = async () => {
    await RequestApi.reject(currentUser.id, request)
}
</script>

<template>
    {{ isModerator }}
    {{ request }}
    <v-card>
        sdgasdgasdg
        sdgasdgasdg
        sdgasdgasdg
        sdgasdgasdg
        sdgasdgasdg
        <div v-if="isModerator && request.status === ERequestStatuses.ON_MODERATION">
            <v-btn color="primary" @click="accept">
                Принять
            </v-btn>
            <v-btn color="primary" @click="setVisibility(true)">
                Отказать
            </v-btn>
        </div>

        <Modal>
            <RequestRejectForm
                @reject="reject"
            />
        </Modal>

    </v-card>
</template>

<style scoped>

</style>