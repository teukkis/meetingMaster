const INIT_EVENTS = 'INIT_EVENTS'
const ADD_EVENT = 'ADD_EVENT'
const initialState = {}


const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_EVENTS:
      return { ...state,  events: action.payload.events }
    case ADD_EVENT:
      return { events: state.users.concat(action.payload) }
    default:
      return state
  }
}

export const initEvents = (events) => (dispatch) => {
  dispatch({
    type: INIT_EVENTS,
    payload: events
  })
}

export const addEvent = (event) => (dispatch) => {
  dispatch({
    type: ADD_EVENT,
    payload: event
  })
}

export default { eventsReducer }