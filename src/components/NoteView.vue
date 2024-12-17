<template>
  <v-container>
    <v-row>
      <v-col 
        v-for="note in notes" 
        :key="note.id" 
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <note-node :note="note" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllNotes } from '../common/noteStorage';

const notes = ref();

onMounted(() => {
  notes.value = getAllNotes();
});

</script>
