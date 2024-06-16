<script setup lang="ts">
import RequestsListView from "@/views/RequestsListView.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { EUserRoles } from "@/core/entities/user/user-roles.enum";

const { currentUser } = useAuthStore()
const router = useRouter()

if (currentUser.role !== EUserRoles.MODERATOR) {
    router.push('/')
}
</script>

<template>
    <RequestsListView
        :is-moderator="true"
    />
</template>

<style scoped>

</style>