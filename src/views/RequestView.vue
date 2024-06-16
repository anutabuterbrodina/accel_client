<script setup lang="ts">
import RequestDetails from "@/components/RequestDetails.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { EUserRoles } from "@/core/entities/user/user-roles.enum";

const { currentUser } = useAuthStore()
const router = useRouter()

if ( ![EUserRoles.MODERATOR, EUserRoles.COMMON_USER].includes(currentUser.role) ) {
    router.push('/')
}
</script>

<template>
    <v-container>
        <RequestDetails
            :is-moderator="currentUser.role === EUserRoles.MODERATOR"
        />
    </v-container>
</template>

<style scoped>

</style>