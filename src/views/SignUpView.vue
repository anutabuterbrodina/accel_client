<script setup lang="ts">
import SignInForm from "@/components/forms/SignUpForm.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { AuthService } from "@/core/services/auth.service";
import { useUserStore } from "@/stores/user";

const { isLoggedIn, refreshStore } = useAuthStore()
const { user } = useUserStore()
const router = useRouter()

if (isLoggedIn.value) {
    router.push({ name: 'home' })
}

const handleSubmitForm = async (password: string) => {
    await AuthService.signup(user, password)

    refreshStore()

    if (isLoggedIn.value) {
        await router.push({ name: 'home' })
    }
}
</script>

<template>
    <v-container>
        <h1 class="text-center mt-15">Регистрация</h1>
        <v-row class="align-center justify-center">
            <SignInForm
                @signup="handleSubmitForm"
            />
        </v-row>

        <div class="text-center">
            <router-link :to="{ name: 'login' }">
                Есть аккаунт? Войти
            </router-link>
        </div>
    </v-container>
</template>

<style scoped>

</style>