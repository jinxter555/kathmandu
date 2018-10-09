import {SELECT_PROJECT} from './types'
export const selectProject = (projectId) => {
  return {
    type: SELECT_PROJECT,
    projectId: projectId
  }
}
