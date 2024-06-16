<script setup lang="ts">
import ProjectsListView from "@/views/ProjectsListView.vue";
import { EUserRoles } from "@/core/entities/user/user-roles.enum";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const { currentUser } = useAuthStore()
const router = useRouter()

if (currentUser.role !== EUserRoles.COMMON_USER) {
    router.push('/')
}
</script>

<template>
    <ProjectsListView
        :is-membered-projects-list="true"
    />
</template>

<style scoped>

</style>