<script lang="ts" setup>
import myHeaderVue from "./components/myHeader.vue";
</script>

<template>
  <div>
    <myHeaderVue />
    <main class="main container">
      <router-view />
    </main>
  </div>
</template>