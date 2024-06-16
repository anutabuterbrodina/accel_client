<script setup lang="ts">
import UserForm from "@/components/forms/UserForm.vue";
import Modal from "@/components/UI/Modal.vue";
import { User } from "@/core/entities/user/user";
import { reactive } from "vue";
import { useModalStore } from "@/stores/modal";

const user = reactive(new User('user4', 'User 4', 'Test', 'user', 'test4@test.com', '81234567894'));

const { setVisibility } = useModalStore()

</script>

<template>
    <v-container>
        <h1 class="text-center mt-15">Профиль</h1>
        <v-card class="mt-15 mx-auto" max-width="500">
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-card-title>
                                Имя:
                            </v-card-title>
                        </v-col>
                        <v-col>
                            <v-card-title>
                                {{ user.name }}
                            </v-card-title>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-card-title>
                                Фамилия:
                            </v-card-title>
                        </v-col>
                        <v-col>
                            <v-card-title>
                                {{ user.surname }}
                            </v-card-title>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-card-title>
                                E-mail:
                            </v-card-title>
                        </v-col>
                        <v-col>
                            <v-card-title>
                                {{ user.email }}
                            </v-card-title>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-card-title>
                                Телефон:
                            </v-card-title>
                        </v-col>
                        <v-col>
                            <v-card-title>
                                {{ user.phone }}
                            </v-card-title>
                        </v-col>
                    </v-row>
                </v-container>

                <v-btn
                    class="text-none mb-4 w-100"
                    color="indigo-darken-3"
                    size="x-large"
                    variant="flat"
                    @click="setVisibility(true);"
                >
                    Редактировать
                </v-btn>
            </v-card-text>
        </v-card>

        <Modal>
            <UserForm
            />
        </Modal>
    </v-container>
</template>

<style scoped>

</style>