const SET_USER = 'SET_USER'
const REMOVE_USER = 'REMOVE_USER'
const initialState = {}


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, token: action.payload.token, user: action.payload.user }
    case REMOVE_USER:
      return state
    default:
      return state
  }
}

export const setUser = (user) => (dispatch) => {
  window.localStorage.setItem('currentUser', JSON.stringify(user))
  dispatch({
    type: SET_USER,
    payload: user
  })
}

export const removeUser = () => {
  localStorage.removeItem('currentUser')
  return {
    type: REMOVE_USER,
    payload: undefined
  }
}

export default { authReducer }