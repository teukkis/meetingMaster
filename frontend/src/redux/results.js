const INIT_RESULTS = 'INIT_RESULTS'
const initialState = {}


const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_RESULTS:
      return {results: action.payload.map(d => {
        return {
          date: d.date,
          people: d.people
        }
      })}
    default:
      return state
  }
}

export const initResults = (results) => (dispatch) => {
  dispatch({
    type: INIT_RESULTS,
    payload: results
  })
}

export default { resultsReducer }