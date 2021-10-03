export function addTask (state, task) {
    state.tasks.push({
        title: task,
        done: false
    })
}

export function removeTask (state, index) {
    state.tasks.splice(index, 1)
}

export function toggleTaskStatus (state, index) {
    state.tasks[index].done = !state.tasks[index].done
}

export function setTasksList (state, tasks) {
    state.tasks = tasks
}