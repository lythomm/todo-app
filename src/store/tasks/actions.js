export function addTask (context, task) {
    context.commit('addTask', task)
}

export function removeTask (context, index) {
    context.commit('removeTask', index)
}

export function toggleTaskStatus (context, index) {
    context.commit('toggleTaskStatus', index)
}

export function setTasksList (context, tasks) {
    context.commit('setTasksList', tasks)
}
