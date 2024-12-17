<template>
  <v-btn 
    color="amber-lighten-3" 
    prepend-icon="mdi-plus"
    @click="updateShowDialog(true)"
  >
    New Note
  </v-btn>

  <new-note-dialog
    v-model="showDialog" 
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
const showDialog = ref(false);

function updateShowDialog(value: boolean) {
  showDialog.value = value;
}
 
</script>

<style>

</style>