import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { VisibilityFilters } from './actionTypes'
import rootReducer from './reducers'

const initialState: IState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: [],
  userInfo: {
    avatarUrl: '',
    sentence: '',
    color: '',
    loginState: false,
    receivedAt: Date.now()
  }
}

const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

export default store

