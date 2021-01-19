const SET_EVENT = 'SET_EVENT'
const initialState = {}


const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENT:
      return { ...state,  event: action.payload }
    default:
      return state
  }
}

export const setEvent = (event) => (dispatch) => {
  dispatch({
    type: SET_EVENT,
    payload: event
  })
}


export default { eventReducer }