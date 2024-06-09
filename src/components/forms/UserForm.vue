<script setup lang="ts">
import { defineProps, reactive, ref } from "vue";
import { User } from "@/core/entities/user";
import { useModalStore } from "@/stores/modal";

defineProps({
})

const valid = ref(false)

const user = reactive(new User('user4', 'User 4', 'Test', 'user', 'test4@test.com', '81234567894'));

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
    alert('Submitted')
}
</script>

<template>
    <v-form v-model="valid" @submit.prevent="submit" class="w-100">
        <v-container>
            <v-row align="center">
                <v-col>
                    <v-text-field
                        v-model="user.name"
                        :counter="10"
                        :rules="nameRules"
                        label="Имя"
                        hide-details
                        required
                    ></v-text-field>
                </v-col>

                <v-col>
                    <v-text-field
                        v-model="user.surname"
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
                        v-model="user.phone"
                        :rules="phoneRules"
                        label="Телефон"
                        hide-details
                        required
                    ></v-text-field>
                </v-col>

                <v-col>
                    <v-text-field
                        v-model="user.email"
                        :rules="emailRules"
                        label="E-mail"
                        hide-details
                        required
                    ></v-text-field>
                </v-col>
            </v-row>

        </v-container>

        <v-btn
            class="text-none mt-4 w-100"
            color="grey-darken-1"
            size="x-large"
            variant="flat"
            type="submit"
        >
            Подтвердить
        </v-btn>
    </v-form>
</template>

<style scoped>

</style>