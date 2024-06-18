<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import { useInvestorStore } from "@/stores/investor";
import { limitRule, requiredRule, notEmptyRule } from "@/components/forms/validators";
import { Constants } from "@/core/static/constants";

const { investor } = useInvestorStore()
const emit = defineEmits(['formAction'])

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
</script>

<template>
    <v-form v-model="isValid" class="w-100" @submit.prevent="submitForm" >
        <v-container>
            <div style="width: 700px;">
                <div v-show="action === 'editCommonData' || action === 'create'">
                    <v-text-field
                        v-model="investor.name"
                        :counter="40"
                        :rules="action === 'editCommonData' || action === 'create' ? [requiredRule, (v) => limitRule(v, 40)] : []"
                        label="Название инвестора"
                        required
                    ></v-text-field>
                    <v-textarea
                        v-model="investor.description"
                        :counter="400"
                        :rules="action === 'editCommonData' || action === 'create' ? [requiredRule, (v) => limitRule(v, 400)] : []"
                        label="Описание инвестора"
                        no-resize
                        rows="10"
                        row-height="15"
                        required
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
                        chips
                        flat
                        multiple
                    ></v-select>
                </div>

                <div>
                    <v-text-field
                        v-model="investor.ty"
                        :counter="40"
                        :rules="action === 'editBusinessData' ? [] : [requiredRule, (v) => limitRule(v, 40)]"
                        label="Название проекта"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="project.name"
                        :counter="40"
                        :rules="action === 'editBusinessData' ? [] : [requiredRule, (v) => limitRule(v, 40)]"
                        label="Название проекта"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="project.name"
                        :counter="40"
                        :rules="action === 'editBusinessData' ? [] : [requiredRule, (v) => limitRule(v, 40)]"
                        label="Название проекта"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="project.name"
                        :counter="40"
                        :rules="action === 'editBusinessData' ? [] : [requiredRule, (v) => limitRule(v, 40)]"
                        label="Название проекта"
                        required
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