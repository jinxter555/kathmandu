
import { SELECT_PROGRAM } from '../actions/types';
import { SELECT_PROJECT } from '../actions/types';

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
        programId: action.programId
      }
    case SELECT_PROJECT:
      return {
        ...state,
        projectId: action.projectId
      }
    default: return state;
  }
}

export default rootReducer
