<script setup lang="ts">
import SignInForm from "@/components/forms/SignUpForm.vue";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";

const { signup, isLoggedIn } = useAuthStore()
const router = useRouter()

if (isLoggedIn.value === true) {
    router.push({ name: 'home' })
}

const handleSubmitForm = async () => {
    try {
        await signup()
        router.push({ name: 'home' })
    } catch (e) {
        alert('Пользователь с таким телефоном или email уже существует')
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