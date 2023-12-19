<template>
  <div>
    <div>
      {{ route.path }}
    </div>
    <Exception type="404" img-color />
  </div>
</template>

<script setup lang="ts" name="error">
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<style scoped></style>
