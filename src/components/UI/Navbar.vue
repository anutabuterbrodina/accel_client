<script setup lang="ts">

import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const { isLoggedIn, logout, userId } = useAuthStore()
const router = useRouter()

</script>

<template>
    <header>
        <v-app-bar height="140">
            <div style="display: flex; flex-direction: column" class="w-100">
                <div class="px-10" style="display: flex">
                    <router-link :to="{ name: 'home' }">
                        <v-app-bar-title>ACCEL</v-app-bar-title>
                    </router-link>

                    <div v-if="isLoggedIn" class="ml-15" style="display: flex; justify-content: flex-start">
                        <router-link :to="{ name: 'userProjects', params: { userId } }" class="ml-10" style="color: inherit">
                            <h3>Мои проекты</h3>
                        </router-link>
                        <router-link :to="{ name: 'userInvestors', params: { userId } }" class="ml-10" style="color: inherit">
                            <h3>Мои инвесторы</h3>
                        </router-link>
                        <router-link :to="{ name: 'userRequests', params: { userId } }" class="ml-10" style="color: inherit">
                            <h3>Мои заявки</h3>
                        </router-link>
                    </div>
                    <v-spacer></v-spacer>

                    <div v-if="isLoggedIn">
                        <v-btn @click="logout">Выйти</v-btn>
                    </div>
                    <div v-else>
                        <v-btn @click="router.push({ name: 'login' })">Войти</v-btn>
                    </div>
                </div>

                <v-divider class="my-6"/>

                <v-row class="text-center">
                    <v-app-bar-title>
                        <router-link :to="{ name: 'projects' }">
                            ПРОЕКТЫ
                        </router-link>
                    </v-app-bar-title>

                    <v-app-bar-title>
                        <router-link :to="{ name: 'investors' }">
                            ИНВЕСТОРЫ
                        </router-link>
                    </v-app-bar-title>
                </v-row>
            </div>
        </v-app-bar>
    </header>
</template>

<style scoped>

</style>