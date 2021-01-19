import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import auth from './redux/auth'
import events from './redux/events'
import event from './redux/event'
import results from './redux/results'

const appReducer = combineReducers({
  authReducer: auth.authReducer,
  eventReducer: event.eventReducer,
  eventsReducer: events.eventsReducer,
  resultsReducer: results.resultsReducer
})

const rootReducer = ( state, action ) => {
  if (action.type === 'REMOVE_USER') {
    state = undefined
  }
  return appReducer(state, action)
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store

