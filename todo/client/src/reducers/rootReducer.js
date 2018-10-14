import { SELECT_PROGRAM } from '../actions/types';
import { SELECT_PROJECT } from '../actions/types';
import { SELECT_PROCESS } from '../actions/types';

const initState = {
  programId: null,
  projectId: null,
  processId: null,
  taskId: null
}

const rootReducer = (state = initState, action) => {
  switch(action.type) {
    case SELECT_PROGRAM:
      return {
        ...state,
        programId: action.programId,
        projectId: null
      }
    case SELECT_PROJECT:
      return {
        ...state,
        projectId: action.projectId,
        processId: null,
        taskId: null
      }
    case SELECT_PROCESS:
      return {
        ...state,
        processId: action.processId,
        taskId: null
      }
    default: return state;
  }
}

export default rootReducer
