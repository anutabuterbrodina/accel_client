<script setup lang="ts">
import CardList from '../components/UI/CardList.vue'
import FilterPanel from '../components/UI/FilterPanel.vue'
import { Request } from "@/core/entities/request/request";
import RequestCard from "@/components/RequestCard.vue";
import { useAuthStore } from "@/stores/auth";
import { defineProps, onMounted, watch } from "vue";
import { Constants } from "@/core/static/constants";
import { useRequestsListStore } from "@/stores/requestsList";


const { currentUser } = useAuthStore()
const { requestsList, requestsFilters, refreshStore } = useRequestsListStore()
const props = defineProps({
    isModerator: {
        type: Boolean,
        default: false,
    }
})

onMounted(async () => {
    await refreshStore(props.isModerator ? null : currentUser.id)
})

watch(requestsFilters, async () => {
    await refreshStore(props.isModerator ? null : currentUser.id)
})

const getById = (id: string): Request => {
    return requestsList.value.find( (request) => <string> request.id === id )
}

</script>

<template>
    <v-container>
        <div class="text-center">
            <h1>Список моих заявок</h1>
        </div>
        <v-row class="mt-5">
            <FilterPanel>
                <v-form>
                    <v-container class="mt-0 pt-0">
                        <v-select
                            label="Статус заявки"
                            clearable
                            v-model="requestsFilters.statuses"
                            :items="Constants.getRequestStatusesNames()"
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
                        v-model="requestsFilters.sortOption"
                        :items="Constants.getSortOptionNames(Request.name)"
                    ></v-select>
                </div>

                <div v-if="requestsList.length === 0">
                    <h1>По данным критериям ничего не найдено</h1>
                </div>
                <CardList
                    v-else
                    :list="requestsList"
                    v-slot="{ id }"
                >
                    <router-link :to="{ name: 'request', params: { userId: currentUser.id, requestId: id } }">
                        <RequestCard
                            :request="getById(id)"
                            :is-moderator="isModerator"
                        />
                    </router-link>
                </CardList>
            </v-col>
        </v-row>

    </v-container>
</template>

<style scoped>

</style>