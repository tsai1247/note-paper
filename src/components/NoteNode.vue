<template>
  <v-card 
    class="bg-amber-darken-1"
  >
    <v-card-title class="d-flex justify-space-between">
      <div class="text-h5 font-weight-black">
        {{ note.title }}
      </div>
      <div>
        <v-tooltip bottom>
          <template #activator="{ props }">
            <v-btn 
              v-bind="props"
              class="bg-amber-darken-3 ml-2"
              size="x-small"
              icon="mdi-pencil"
              @click="updateShowEditDialog(true)"
            />
          </template>
          <span>
            Edit
          </span>
        </v-tooltip>

        <v-tooltip bottom>
          <template #activator="{ props }">
            <v-btn 
              v-bind="props"
              class="bg-amber-darken-3 ml-2"
              size="x-small"
              icon="mdi-delete"
              @click="deleteNoteNode(note.id)"
            />
          </template>
          <span>
            Delete
          </span>
        </v-tooltip>
      </div>
    </v-card-title>
    <v-card-text>
      <div 
        v-for="(content, index) in note.content" 
        :key="index"
        class="ma-2"
      >
        <v-hover>
          <template #default="{ isHovering }">
            <a 
              class="a_link font-weight-bold text-h6"
              :class="isHovering ? 'text-red-accent-3' : 'text-blue-grey-darken-1'"
              :href="content.href"
              target="_blank"
            >
              <span class="hypertext">
                {{ content.text }}
              </span>
            </a>
          </template>
        </v-hover>
      </div>
    </v-card-text>
  </v-card>

  <edit-note-dialog
    v-model="showEditDialog"
    :note="note"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { PropType } from 'vue';
import { type Note } from '../interface/type';
import { deleteNote } from '../common/noteStorage';

defineProps({
  note: {
    type: Object as PropType<Note>,
    required: true
  }
})

function deleteNoteNode(id: string) {
  deleteNote(id);

  // refresh page
  location.reload();
}

const showEditDialog = ref(false);
function updateShowEditDialog(value: boolean) {
  showEditDialog.value = value;
}

</script>

<style scoped>
.hypertext:hover {
  color: rgb(255, 69, 0); /* Orange red */
}
.a-link {
  text-decoration: none;
  user-select: none;
  margin-left: 10px;
}

.a-link:link,
.a-link:visited {
  color: black;
}

</style>