<script setup lang="ts">
import LogInForm from "@/components/forms/LogInForm.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { AuthService } from "@/core/services/auth.service";

const { isLoggedIn, refreshStore } = useAuthStore()
const router = useRouter()

if (isLoggedIn.value) {
    router.push({ name: 'home' })
}

const handleSubmitForm = async (email: string, password: string) => {
    await AuthService.login(email, password)

    refreshStore()

    if (isLoggedIn.value) {
        await router.push({ name: 'home' })
    }
}
</script>

<template>
    <v-container>
        <h1 class="text-center mt-15">Вход</h1>
        <v-row class="align-center justify-center">
            <LogInForm @login="handleSubmitForm"/>
        </v-row>
        <div class="text-center">
            <router-link :to="{ name: 'signup' }">
                Нет аккаунта? Зарегистрироваться
            </router-link>
        </div>
    </v-container>
</template>

<style scoped>

</style>