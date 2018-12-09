import * as R from "ramda"
import {
  STEP_NEXT,
  STEP_BACK,
  ADD_SCHEMA,
  ADD_FOUNDER,
  REMOVE_SCHEMA,
} from "../actions/daoCreator"

type State = {
  step: number
  data: any
  founders: Founder[]
  schemas: string[]
}

const initialState = {
  step: 0,
  data: {},
  founders: [],
  schemas: [],
}

export const daoCreatorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case STEP_NEXT:
      return R.merge(state, { step: state.step + 1, data: action.payload })
    case STEP_BACK:
      return R.merge(state, { step: state.step - 1 })
    case ADD_FOUNDER:
      return R.merge(state, {
        founders: R.append(action.payload, state.founders),
      })
    case ADD_SCHEMA:
      return R.merge(state, {
        schemas: R.append(action.payload, state.schemas),
      })
    case REMOVE_SCHEMA:
      return R.merge(state, {
        schemas: R.without([action.payload], state.schemas),
      })
    default:
      return state
  }
}
