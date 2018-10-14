import {SELECT_PROCESS} from './types'
export const selectProcess = (processId) => {
  return {
    type: SELECT_PROCESS,
    processId: processId
  }
}
