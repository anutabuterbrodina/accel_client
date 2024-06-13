<script setup lang="ts">
import CardList from '../components/UI/CardList.vue'
import FilterPanel from '../components/UI/FilterPanel.vue'
import { Request } from "@/core/entities/request";
import RequestCard from "@/components/RequestCard.vue";
import { useRequestStore } from "@/stores/request";
import { useAuthStore } from "@/stores/auth";
import { onMounted, watch } from "vue";
import { useFilterStore } from "@/stores/filter";

const { requestsList, loadRequestsList, isListEmpty, statuses, types } = useRequestStore()
const { requestSortOptions, requestFilter, getRequestFilter } = useFilterStore()
const { userId } = useAuthStore()

onMounted(async () => {
    loadRequestsList(getRequestFilter(), userId.value)
})

const getById = (id: string): Request => {
    return requestsList.value.find( (request) => request.id === id )
}

watch(requestFilter, async () => {
    isListEmpty.value = false
    loadRequestsList(getRequestFilter(), userId.value)
})

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
<!--                        <v-select-->
<!--                            label="Тип заявки"-->
<!--                            clearable-->
<!--                            v-model="requestFilter.types"-->
<!--                            :items="types"-->
<!--                            chips-->
<!--                            flat-->
<!--                            multiple-->
<!--                        ></v-select>-->
                        <v-select
                            label="Статус заявки"
                            clearable
                            v-model="requestFilter.statuses"
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
                        v-model="requestFilter.sortOption"
                        :items="requestSortOptions"
                    ></v-select>
                </div>

                <div v-if="isListEmpty">
                    <h1>По данным критериям ничего не найдено</h1>
                </div>
                <CardList
                    v-else
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