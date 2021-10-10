<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input class="col" square filled bg-color="white" v-model="newTask" placeholder="Add task" dense @keyup.enter="addNewTask">
        <template v-slot:append>
          <q-btn round dense flat icon="add" @click="addNewTask" />
        </template>
      </q-input>
    </div>
    <q-list separator bordered class="bg-white">
      <q-item
        v-for="(task, index) in getTasks"
        :key="task.title"
        clickable
        :class="{ 'bgprimary' : task.done }"
        v-ripple
        @click="onTaskStatusToggle(index)"
      >
        <q-item-section avatar>
          <q-checkbox class="no-pointer-events" v-model="task.done" color="primary" />
        </q-item-section>
        <q-item-section :class="{ 'done' : task.done }">
          <q-item-label>{{ task.title }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="task.done" side>
          <q-item-label>
            <q-btn @click.stop="deleteTask(index)" flat dense round color="primary" icon="delete" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div v-if="!getTasks.length" class="no-task absolute-center">
      <q-icon name="check" size="100px" color="primary" />
      <div class="text-h5 text-primary text-center">
        No Task
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      newTask: '',
      confirmDeleteTask: false,
      STORAGE_KEY: 'todo-storage'
    }
  },
  computed: {
    ...mapGetters('tasks', ['getTasks']),
  },
  mounted () {
    this.setTasksList(JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]'))
  },
  methods: {
    ...mapActions('tasks', ['addTask', 'removeTask', 'toggleTaskStatus', 'setTasksList']),
    addNewTask() {
      // push new task in tasks array
      this.addTask(this.newTask)
      // reset newtask value
      this.newTask = ''
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.getTasks))
    },
    deleteTask(index) {
      this.removeTask(index)
      this.$q.notify('Task deleted')
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.getTasks))
    },
    onTaskStatusToggle(index) {
      this.toggleTaskStatus(index)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.getTasks))
    }
  }
}
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
.no-task {
  opacity: 0.5;
}
.bgprimary {
  background-color: primary;
}
</style>