<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { AuthService } from "@/core/services/auth.service";
import { EUserRoles } from "@/core/entities/user/user-roles.enum";
import { computed, ref } from "vue";
import { EUserAccountTypes } from "@/core/entities/user/user-account-types.enum";

const { isLoggedIn, currentUser, refreshStore } = useAuthStore()
const router = useRouter()

const logout = () => {
    AuthService.logout()
    refreshStore()
    router.push({ name: 'home' })
}

const isUser = computed(() => currentUser.role === EUserRoles.COMMON_USER && isLoggedIn)
const isModerator = computed(() => currentUser.role === EUserRoles.MODERATOR && isLoggedIn)
const isProject = computed(() => currentUser.type === EUserAccountTypes.PROJECT && isLoggedIn)
const isInvestor = computed(() => currentUser.type === EUserAccountTypes.INVESTOR && isLoggedIn)

</script>

<template>
    <header>
        <v-app-bar height="140">
            <div style="display: flex; flex-direction: column" class="w-100">
                <div class="px-10" style="display: flex">
                    <router-link :to="{ name: 'home' }">
                        <v-app-bar-title>ACCEL</v-app-bar-title>
                    </router-link>

                    <div v-if="isUser" class="ml-15" style="display: flex; justify-content: flex-start">
                        <router-link :to="{ name: 'userProjects', params: { userId: currentUser.id } }" class="ml-10" style="color: inherit" v-if="isProject">
                            <h3>Мои проекты</h3>
                        </router-link>
                        <router-link :to="{ name: 'userInvestors', params: { userId: currentUser.id } }" class="ml-10" style="color: inherit" v-if="isInvestor">
                            <h3>Мои инвесторы</h3>
                        </router-link>
                        <router-link :to="{ name: 'userRequests', params: { userId: currentUser.id } }" class="ml-10" style="color: inherit">
                            <h3>Мои заявки</h3>
                        </router-link>
                        <router-link :to="{ name: 'bookmarks', params: { userId: currentUser.id } }" class="ml-10" style="color: inherit" v-if="isInvestor">
                            <h3>Мои закладки</h3>
                        </router-link>
                    </div>

                    <div v-if="isModerator" class="ml-15" style="display: flex; justify-content: flex-start">
                        <router-link :to="{ name: 'requests' }" class="ml-10" style="color: inherit">
                            <h3>Все заявки</h3>
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
                            ВСЕ ПРОЕКТЫ
                        </router-link>
                    </v-app-bar-title>

                    <v-app-bar-title>
                        <router-link :to="{ name: 'investors' }">
                            ВСЕ ИНВЕСТОРЫ
                        </router-link>
                    </v-app-bar-title>
                </v-row>
            </div>
        </v-app-bar>
    </header>
</template>

<style scoped>

</style>