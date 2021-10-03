<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-md">
      <div class="q-pt-sm text-h5">Notes</div>
      <q-btn class="q-ml-sm" color="primary" round icon="add" @click="createNewNote" /> 
    </div>
    <div class="row notes">
      <q-list class="col" separator>
        <q-item :class="{ 'bg-primary text-weight-bolder' : note === currentNote }" v-for="note in notes" :key="note.title" clickable v-ripple @click="toggleNote(note)">
          <q-item-section>{{ note.title }}</q-item-section>
        </q-item>
      </q-list>
      <div v-if="currentNote" class="col-10 q-pl-md current-note">
        <q-input class="text-h4 q-pb-md" v-model=currentNote.title ref="noteTitle"></q-input>
        <!-- <q-input filled v-model="currentNote.contents"/> -->
        <textarea class="text-area" rows="10" v-model="currentNote.contents"></textarea>
      </div>
    </div>

  <!-- no note saved page -->
  <div v-if="!notes.length" style="opacity: 0.5" class="absolute-center">
    <div class="text-h5 text-primary text-center">
      No note saved
    </div>
  </div>
  </q-page>
</template>

<script>

export default {
  data () {
    return {
      notes: [],
      currentNote: null
    }
  },
  mounted () {
    if (localStorage.notes) {
      this.notes = JSON.parse(localStorage.notes)
    }
  },
  watch: {
    notes: {
      handler(newNotes) {
        localStorage.notes = JSON.stringify(newNotes)
      },
      deep: true
    }
  },
  methods: {
    createNewNote () {
      const newNote = {title:'', contents: ''}
      this.notes.push(newNote)
      this.currentNote = newNote
      //wait for the creation of the note to focus
      this.$nextTick(function() {
        this.$refs.noteTitle.focus()
      })
    },
    toggleNote (note) {
      if (this.currentNote === note) {
        this.currentNote = null
      } else {
        this.currentNote = note
      }
    }
  }
}
</script>

<style lang="scss">
.text-area {
  outline: none;
  resize: none;
  border: none;
  width: 100%;
}
</style>