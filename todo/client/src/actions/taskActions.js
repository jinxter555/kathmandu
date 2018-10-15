import {SELECT_TASK} from './types'
export const selectTask = (taskId) => {
  return {
    type: SELECT_TASK,
    taskId: taskId
  }
}
