<script setup lang="ts">
import LogInForm from "@/components/forms/LogInForm.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const { isLoggedIn, login } = useAuthStore()
const router = useRouter()

if (isLoggedIn.value === true) {
    router.push({ name: 'home' })
}

const handleSubmitForm = async () => {
    login().then(() => {
        router.push({ name: 'home' })
    }).catch(e => {
        console.log(e)
        alert('Неверно введен пароль или логин')
    })
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