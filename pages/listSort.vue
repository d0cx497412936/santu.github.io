<template>
    <div class="panel-list">
        <draggable v-model="list"  transition-group="500" animation="100" :sort="true">
            <template #item="{ element,index }">
                <div class="panel-list-menu" :key="element.id">
                    {{ element.title }}
                </div>
            </template>
        </draggable>

    </div>
</template>
<script setup lang="ts">
import draggable from "vuedraggable";
const list:any= ref([])
for (let i = 1; i < 10; i++) {
    list.value.push({
        id: 'sort' + i,
        title:'序号：'+i
    })
}
</script>
