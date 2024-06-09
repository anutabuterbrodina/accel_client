<script setup lang="ts">
import { ref } from "vue";
import { useModalStore } from "@/stores/modal";

const email = ref()
const password = ref()
const phone = ref()
const name = ref()
const surname = ref()

const valid = ref(false)

const nameRules = [
    v => !!v || 'Name is required',
    v => v.length <= 40 || 'Name must be less than 40 characters',
]
const emailRules = [
    // (v: string) => v.match('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$')
    (v: string) => /.+@.+\..+/.test(v) || 'Введите корректный Email'
]
const phoneRules = [
    (v: string) => v.match('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$')  || 'Введите корректный телефон'
]

const { setVisibility } = useModalStore()

const submit = (ev) => {
    setVisibility(false)
    console.log('Logged in')
}
</script>

<template>
    <v-form v-model="valid" @submit.prevent="submit" class="w-50 mt-5" >
        <v-container>

            <v-row align="center">
                <v-col>
                    <v-text-field
                        v-model="name"
                        :counter="10"
                        :rules="nameRules"
                        label="Имя"
                        hide-details
                        required
                    ></v-text-field>
                </v-col>

                <v-col>
                    <v-text-field
                        v-model="surname"
                        :counter="10"
                        :rules="nameRules"
                        label="Фамилия"
                        hide-details
                        required
                    ></v-text-field>
                </v-col>

            </v-row>

            <v-row>
                <v-col>
                    <v-text-field
                        v-model="phone"
                        :rules="phoneRules"
                        label="Телефон"
                        hide-details
                        required
                    ></v-text-field>
                </v-col>

                <v-col>
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        hide-details
                        required
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-text-field
                        v-model="password"
                        label="Password"
                        hide-details
                        type="password"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-btn
                class="text-none mt-4 w-100"
                color="grey-darken-1"
                size="x-large"
                variant="flat"
                type="submit"
            >
                Регистрация
            </v-btn>

        </v-container>
    </v-form>
</template>

<style scoped>

</style>