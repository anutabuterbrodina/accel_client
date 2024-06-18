<script setup lang="ts">
import RequestsListFilter from "@/components/RequestsListFilter.vue";
import RequestCard from "@/components/RequestCard.vue";
import CardList from './UI/CardList.vue'
import Sort from "@/components/UI/Sort.vue";
import { useRouter } from "vue-router";
import { Constants } from "@/core/static/constants";
import { useRequestsListStore } from "@/stores/requestsList";
import { Request } from "@/core/entities/request/request";


const { requestsList } = useRequestsListStore()
const router = useRouter();

const getById = (id: string): Request => {
    return requestsList.value.find( (request) => request.id === id )
}
</script>

<template>
    <v-row class="mt-3">

        <v-col cols="3">
            <RequestsListFilter/>
        </v-col>

        <v-col>
            <div style="display: flex">
                <Sort
                    :sort-items="Constants.getSortOptionNames( Request.name )"
                    style="max-width: 215px"
                />
            </div>

            <CardList
                :list="requestsList"
                v-slot="{ id }"
            >
                <router-link :to="{ name: 'request', params: { requestId: id } }">
                    <RequestCard :request="getById(id)" />
                </router-link>
            </CardList>
        </v-col>

    </v-row>
</template>

<style scoped>

</style>