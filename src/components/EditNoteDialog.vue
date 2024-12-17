<template>
  <v-dialog
    v-model="showDialog"
    max-width="750"
  >
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <span>Edit Note</span>
        <v-btn 
          icon="mdi-close"
          @click="closeDialog" 
        />
      </v-card-title>
      <v-card-text>
        <v-text-field
          ref="focusElement"
          v-model="title"
          maxlength="6"
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
import { ref, computed, watch, defineEmits, nextTick } from 'vue';
import type { PropType } from 'vue';
import { type Note } from '../interface/type';
import { updateNote } from '../common/noteStorage';
import { URLS_PER_NOTE } from '@/common/constants';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  note: {
    type: Object as PropType<Note>,
    default: null
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

const title = ref('');
const contents = ref<string[]>(new Array<string>(URLS_PER_NOTE).fill(''));
const urls = ref<string[]>(new Array<string>(URLS_PER_NOTE).fill(''));

const closeDialog = () => {
  emit('update:model-value', false);
}

const id = computed(() => {
  return props.note?.id;
})
function saveNote() {
  if(id.value) {
    updateNote(id.value, title.value, contents.value, urls.value);
  }

  closeDialog();

  // refresh page
  location.reload();
}

const focusElement = ref<HTMLInputElement | null>(null)
watch(showDialog, (value) => {
  if (value) {
    title.value = props.note?.title || '';
    contents.value = props.note?.content.map((content) => content.text) || new Array<string>(URLS_PER_NOTE).fill('');
    urls.value = props.note?.content.map((content) => content.href) || new Array<string>(URLS_PER_NOTE).fill('');
    nextTick(() => {
      focusElement.value?.focus();
    })
  }
})

</script>