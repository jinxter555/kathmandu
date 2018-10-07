import {SELECT_PROGRAM} from './types'
export const selectProgram = (programId) => {
  return {
    type: SELECT_PROGRAM,
    programId: programId
  }
}
