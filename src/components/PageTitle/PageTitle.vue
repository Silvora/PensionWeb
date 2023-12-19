<template>
    <div class="title">
        {{ t(title) }}
    </div>
</template>

<script setup lang='ts'>
import { ref } from "vue";
import { useI18n } from "vue-i18n"

import { useRoute } from 'vue-router'
const route = useRoute()
const { t } = useI18n()
const title = ref<any>('')
title.value = route?.meta?.title
</script>

<style scoped lang='less'>
.title {
    font-size: 24px;
    font-weight: 800;

}
</style>