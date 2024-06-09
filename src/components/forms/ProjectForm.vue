<script setup lang="ts">
import { defineProps, reactive, ref } from "vue";
import { Project } from "@/core/entities/project";

defineProps({
    action: String
})

const valid = ref(false)

const project = reactive(new Project(
    '1',
    'Project 1',
    'Project 1 bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ',
    ['Тег 1', 'Тег 2', 'Тег 3'],
    100000,
    5000000,
    'user1',
    ['user1', 'user2', 'user3'],
));

const tags = ['Тег 1', 'Тег 2', 'Тег 3', 'Тег 4', 'Тег 5', 'Тег 6', 'Тег 7', 'Тег 8', 'Тег 9']
const investments = [100000, 500000, 1000000, 5000000, 10000000]

const nameRules = [
    v => !!v || 'Project name is required',
    v => v.length <= 40 || 'Name must be less than 40 characters',
]
const descRules = [
    v => v.length <= 400 || 'Project description must be less than 400 characters',
]
const rangeMinRules = [
    v => project.investmentMin && project.investmentMax && v <= project.investmentMax || 'Min cant be more than max'
]
const rangeMaxRules = [
    v => project.investmentMin && project.investmentMax && v >= project.investmentMin || 'Max cant be less than min'
]


const bp = ref()
</script>

<template>
    <v-form v-model="valid" class="w-100">
        <v-container>
            <div style="width: 700px;">
                <div v-show="action === 'editCommonData' || action === 'create'">
                    <v-text-field
                        v-model="project.name"
                        :counter="40"
                        :rules="nameRules"
                        label="Название проекта"
                        required
                    ></v-text-field>
                    <v-textarea
                        v-model="project.description"
                        :counter="400"
                        :rules="descRules"
                        label="Описание проекта"
                        no-resize
                        rows="10"
                        row-height="15"
                        required
                        clearable
                        clear-icon="mdi-close-circle"
                    ></v-textarea>
                </div>

                <div v-show="action === 'editBusinessData' || action === 'create'">
                    <v-select
                        clearable
                        v-model="project.tags"
                        :items="tags"
                        chips
                        flat
                        multiple
                    ></v-select>

                    <div style="display: flex">
                        <v-select
                            v-model="project.investmentMin"
                            :items="investments"
                            :rules="rangeMinRules"
                            label="Мин. размер инвестиций"
                        ></v-select>
                        <v-select
                            v-model="project.investmentMax"
                            :items="investments"
                            :rules="rangeMaxRules"
                            label="Макс. размер инвестиций"
                        ></v-select>
                    </div>

                    <v-file-input
                        label="Бизнес-план"
                        v-model="bp"
                        accept="pdf"
                    ></v-file-input>
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