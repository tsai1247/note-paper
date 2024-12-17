<template>
  <v-dialog
    v-model="showDialog"
    max-width="750"
  >
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <span>New Note</span>
        <v-btn 
          icon="mdi-close"
          @click="closeDialog" 
        />
      </v-card-title>
      <v-card-text>
        <v-text-field
          ref="noteElement"
          v-model="title"
          label="Note Title"
          placeholder="Example: Meeting Schedules"
        />
        
        <div 
          v-for="index in URLS_PER_NOTE" 
          :key="index"
        >
          <v-row>
            <v-col cols="4">
              <v-text-field 
                v-model="contents[index - 1]"
                :label="'Content ' + index"
                maxlength="15"
                :placeholder="'Enter content ' + index"
              />
            </v-col>
            <v-col cols="8">
              <v-text-field
                v-model="urls[index - 1]"
                :label="'URL ' + index"
                :placeholder="'Enter URL ' + index"
              />
            </v-col>
          </v-row>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn 
          color="primary" 
          @click="saveNote"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { addNewNote } from '../common/noteStorage';
import { URLS_PER_NOTE } from '../common/constants';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:model-value'])

/* Dialog的設定 */
const showDialog = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:model-value', value);
  },
});

const title = ref('')
const contents = ref<string[]>(new Array(URLS_PER_NOTE).fill(''))
const urls = ref<string[]>(new Array(URLS_PER_NOTE).fill(''))

const closeDialog = () => {
  emit('update:model-value', false);
}

function saveNote() {
  addNewNote(title.value, contents.value, urls.value);
  closeDialog();
  
  // refresh page
  location.reload();
}

const noteElement = ref<HTMLInputElement | null>(null)
watch(showDialog, (value) => {
  if (value) {
    title.value = '';
    contents.value = new Array(URLS_PER_NOTE).fill('');
    urls.value = new Array(URLS_PER_NOTE).fill('');
    nextTick(() => {
      noteElement.value?.focus();
    })
  }
})

</script>