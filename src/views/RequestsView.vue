<script setup lang="ts">
import CardList from '../components/UI/CardList.vue'
import ProjectCard from '../components/ProjectCard.vue'
import FilterPanel from '../components/UI/FilterPanel.vue'
import { defineProps, PropType, reactive, ref } from "vue";
import { Request } from "@/core/entities/request";
import RequestCard from "@/components/RequestCard.vue";
import { useRoute } from "vue-router";

const rawRequestsList = ref(
    [
        new Request(
            'req1',
            'Заявка на создание проекта',
            'Одобрена',
            'user1',
            'project1',
        ),
        new Request(
            'req2',
            'Заявка на изменение данных проекта',
            'На модерации',
            'user1',
            'project1',
        ),
        new Request(
            'req3',
            'Заявка на создание инвестора',
            'Отклонена',
            'user2',
            undefined,
            'Некорректные реквизиты',
            'Для юридического лица необходимо указать ???ОГРН???',
        ),
        new Request(
            'req4',
            'Заявка на создание инвестора',
            'Одобрена',
            'user2',
            'investor1',

        ),
        new Request(
            'req5',
            'Заявка на изменение данных инвестора',
            'Одобрена',
            'user2',
            'investor1',
        )
    ]
);
const route = useRoute();
const currentUserId = <String> route.params?.userId

const requestsList = ref( rawRequestsList.value.filter(request =>
    currentUserId && request.creatorId === currentUserId
))

const getById = (id: string): Request => {
    return requestsList.value.find( (request) => request.id === id )
}

const statuses = ['Отклонена', 'На модерации', 'Одобрена']
const types = ['Заявка на изменение данных проекта', 'Заявка на изменение данных проекта', 'Заявка на создание инвестора', 'Заявка на изменение данных инвестора']

const filter = reactive({
    types: null,
    sortOrder: 'ASC',
    sortOption: 'По умолчанию',
    statuses: null,
});
</script>

<template>
    <v-container>
        <div class="text-center">
            <h1>Список проектов</h1>
        </div>
        <v-row class="mt-5">
            <FilterPanel>
                <v-form>
                    <v-container class="mt-0 pt-0">
                        <v-select
                            label="Тип заявки"
                            clearable
                            v-model="filter.types"
                            :items="types"
                            chips
                            flat
                            multiple
                        ></v-select>
                        <v-select
                            label="Статус заявки"
                            clearable
                            v-model="filter.statuses"
                            :items="statuses"
                            chips
                            flat
                            multiple
                        ></v-select>
                    </v-container>
                </v-form>
            </FilterPanel>

            <v-col>
                <div>
                    <v-select
                        v-model="filter.sortOption"
                        :items="['Сначала новые', 'Сначала старые', 'По умолчанию']"
                    ></v-select>
                </div>
                <CardList
                    :list="requestsList"
                    v-slot="{ id }"
                >
                    <RequestCard
                        :request="getById(id)"
                    />
                </CardList>
            </v-col>
        </v-row>



    </v-container>
</template>

<style scoped>

</style>