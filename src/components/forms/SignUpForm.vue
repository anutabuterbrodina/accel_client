<script setup lang="ts">
import { defineEmits, ref, watch } from "vue";
import { requiredRule, limitRule, phoneRule, emailRule } from "@/components/forms/validators";
import { useUserStore } from "@/stores/user";
import { Constants } from "@/core/static/constants";

const { user } = useUserStore()
const emit = defineEmits(['signup'])

const isValid = ref(false)
const passwordCheckRules = (v: string) => v === password.value || 'Пароли должны совпадать'
const password = ref('')
const passwordCheck = ref('')
const type = ref(null)

watch(type, () => {
    user.type = Constants.getUserAccountTypeValueByName(type.value)
})

const submitForm = () => {
    if (!isValid.value) {
        alert('Введите корректные данные')
        return
    }
    emit('signup', password.value)
}
</script>

<template>
    <v-form v-model="isValid" @submit.prevent="submitForm" class="w-50 mt-5" >
        <v-container>
            <v-row align="center">
                <v-col>
                    <v-text-field
                        v-model="user.name"
                        :counter="10"
                        :rules="[requiredRule, (v) => limitRule(v, 10)]"
                        label="Имя"
                        required
                    ></v-text-field>
                </v-col>

                <v-col>
                    <v-text-field
                        v-model="user.surname"
                        :counter="15"
                        :rules="[requiredRule, (v) => limitRule(v, 15)]"
                        label="Фамилия"
                        required
                    ></v-text-field>
                </v-col>

            </v-row>

            <v-row>
                <v-col>
                    <v-text-field
                        v-model="user.phone"
                        :rules="[requiredRule, phoneRule]"
                        label="Телефон"
                        required
                    ></v-text-field>
                </v-col>

                <v-col>
                    <v-text-field
                        v-model="user.email"
                        :rules="[requiredRule, emailRule]"
                        label="E-mail"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-select
                        v-model="type"
                        :items="Constants.getUserAccountTypeNames()"
                        :rules="[requiredRule]"
                        label="Выберите подходящую опцию"
                        chips
                        flat
                    ></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-text-field
                        v-model="password"
                        :rules="[requiredRule]"
                        label="Пароль"
                        type="password"
                        required
                    ></v-text-field>
                </v-col>

                <v-col>
                    <v-text-field
                        v-model="passwordCheck"
                        :rules="[passwordCheckRules, requiredRule]"
                        label="Подтвердите пароль"
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