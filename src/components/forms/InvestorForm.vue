<script setup lang="ts">
import { defineEmits, defineProps, onMounted, ref, watch } from "vue";
import { useInvestorStore } from "@/stores/investor";
import { limitRule, requiredRule, notEmptyRule } from "@/components/forms/validators";
import { Constants } from "@/core/static/constants";
import { useRoute } from "vue-router";

const { investor, loadInvestor } = useInvestorStore()
const emit = defineEmits(['formAction'])
const route = useRoute()

defineProps({
    action: String
})

const isValid = ref(false)
const comment = ref('')

const submitForm = () => {
    if (!isValid.value) {
        alert('Введите корректные данные')
        return
    }
    emit('formAction')
}

const type = ref(Constants.getInvestorTypeNameByValue(investor.type))

watch(type, () => {
    investor.type = Constants.getInvestorTypeValueByName(type.value)
})

</script>

<template>
    <v-form v-model="isValid" class="w-100" @submit.prevent="submitForm">
        <v-container>

            <div style="width: 700px; max-height: calc(100vh - 200px); overflow-y: auto;">

                <div v-show="action === 'editCommonData' || action === 'create'">

                    <v-text-field
                        v-model="investor.name"
                        :counter="40"
                        :rules="action === 'editCommonData' || action === 'create' ? [requiredRule, (v) => limitRule(v, 40)] : []"
                        label="Название инвестора"
                    ></v-text-field>

                    <v-textarea
                        v-model="investor.description"
                        :counter="400"
                        :rules="action === 'editCommonData' || action === 'create' ? [(v) => limitRule(v, 400)] : []"
                        label="Описание инвестора"
                        no-resize
                        rows="10"
                        row-height="15"
                        clearable
                        clear-icon="mdi-close-circle"
                    ></v-textarea>
                </div>

                <div v-show="action === 'editInterests' || action === 'create'">
                    <v-select
                        clearable
                        v-model="investor.interests"
                        :items="Constants.getTagsNames()"
                        :rules="action === 'editInterests' || action === 'create' ? [notEmptyRule] : []"
                        label="Категории интересов"
                        chips
                        flat
                        multiple
                    ></v-select>
                </div>

                <div v-show="action === 'editBusinessData' || action === 'create'">
                    <v-select
                        clearable
                        v-model="type"
                        :items="Constants.getInvestorTypesNames()"
                        :rules="action === 'editBusinessData' || action === 'create' ? [requiredRule] : []"
                        label="Тип инвестора"
                        chips
                        flat
                    ></v-select>

                    <v-text-field
                        v-model="investor.requisites.legalName"
                        :counter="20"
                        :rules="action === 'editBusinessData' || action === 'create' ? [(v) => limitRule(v, 20)] : []"
                        label="Юридическое имя"
                    ></v-text-field>

                    <v-text-field
                        v-model="investor.requisites.address"
                        :counter="100"
                        :rules="action === 'editBusinessData' || action === 'create' ? [(v) => limitRule(v, 100)] : []"
                        label="Юридический адресс"
                    ></v-text-field>
                    <v-text-field
                        v-model="investor.requisites.INN"
                        :counter="12"
                        :rules="action === 'editBusinessData' || action === 'create' ? [(v) => limitRule(v, 12)] : []"
                        label="ИНН"
                    ></v-text-field>
                    <v-text-field
                        v-model="investor.requisites.OGRN"
                        :counter="12"
                        :rules="action === 'editBusinessData' || action === 'create' ? [(v) => limitRule(v, 12)] : []"
                        label="ОГРН"
                    ></v-text-field>
                    <v-text-field
                        v-model="investor.requisites.KPP"
                        :counter="12"
                        :rules="action === 'editBusinessData' || action === 'create' ? [(v) => limitRule(v, 12)] : []"
                        label="КПП"
                    ></v-text-field>
                    <v-text-field
                        v-model="investor.requisites.OKPO"
                        :counter="12"
                        :rules="action === 'editBusinessData' || action === 'create' ? [(v) => limitRule(v, 12)] : []"
                        label="ОКПО"
                    ></v-text-field>
                    <v-text-field
                        v-model="investor.requisites.BIK"
                        :counter="12"
                        :rules="action === 'editBusinessData' || action === 'create' ? [(v) => limitRule(v, 12)] : []"
                        label="БИК"
                    ></v-text-field>
                </div>


            </div>
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