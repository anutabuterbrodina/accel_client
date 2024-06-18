<script setup lang="ts">
import ProjectsList from "@/components/ProjectsList.vue";
import { onMounted, watch } from "vue";
import { useProjectsListStore } from "@/stores/projectsList";
import { useSortStore } from "@/stores/sort";
import { useFilterStore } from "@/stores/filter";


const { loadProjectsList } = useProjectsListStore()
const { sort } = useSortStore()
const { searchQuery, projectsFilters } = useFilterStore()

onMounted(async () => {
    await loadProjectsList(projectsFilters, null, null, searchQuery.value, sort)
})

watch([projectsFilters, sort], async () => {
    await loadProjectsList(projectsFilters, null, null, searchQuery.value, sort)
})
</script>

<template>
    <v-container class="mt-5">
        <div class="text-center">
            <h1>Список проектов</h1>
        </div>

        <ProjectsList/>

    </v-container>
</template>

<style scoped>

</style>