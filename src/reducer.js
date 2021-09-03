import { createStore } from "redux"

const initialState = {
  mistakes: 0, 
  step: -1,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_MISTAKES':
      return {...state, mistakes: state.mistakes + action.payload};
    case 'INCREMENT_STEP':
      return {...state, question: state.step + action.payload}
    default: 
      return state
  }
}

const store = createStore(reducer);

export default store;