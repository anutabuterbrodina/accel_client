<script setup lang="ts">
import RequestsList from "@/components/RequestsList.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { EUserRoles } from "@/core/entities/user/user-roles.enum";
import { onMounted, watch } from "vue";
import { useRequestsListStore } from "@/stores/requestsList";
import { useFilterStore } from "@/stores/filter";
import { useSortStore } from "@/stores/sort";


const { currentUser } = useAuthStore()
const { loadRequestsList, refreshStore } = useRequestsListStore()
const { requestsFilters } = useFilterStore()
const { sort } = useSortStore()
const router = useRouter()

if (currentUser.role !== EUserRoles.COMMON_USER) {
    router.push('/')
}

onMounted(async () => {
    await loadRequestsList(requestsFilters, currentUser.id, sort)
})

watch([requestsFilters, sort], async () => {
    await loadRequestsList(requestsFilters, currentUser.id, sort)
})
</script>

<template>
    <v-container class="mt-5">
        <div class="text-center">
            <h1>Список моих заявок</h1>
        </div>

        <RequestsList />

    </v-container>
</template>

<style scoped>

</style>