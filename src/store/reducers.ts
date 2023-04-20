
import { combineReducers } from 'redux'
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters, ActionAvatar } from './actionTypes'

export function todos(state: ITodoItem[] = [], action: any) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      // return state.map((todo: any) => {
      //   if (todo.id === action.id) {
      //     return Object.assign({}, todo, {
      //       completed: !todo.completed
      //     })
      //   }
      //   return todo
      // })
      return state.map((todo: any) => (todo.id === action.id) ? { ...todo, completed: !todo.completed } : todo)
    default:
      return state
  }
}


// function todoApp(state = initialState, action: any) {
//   // if (typeof state === 'undefined') {
//   //   return initialState
//   // }
//   // return state
//   switch (action.type) {
//     case SET_VISIBILITY_FILTER:
//       // return { ...state, ...{ visibilityFilter: action.filter } }
//       return Object.assign({}, state, {
//         visibilityFilter: action.filter
//       })
//     case ADD_TODO:
//       return Object.assign({}, state, { todos: todos(state.todos, action) })
//     case TOGGLE_TODO:
//       return Object.assign({}, state, { todos: todos(state.todos, action) })
//     default:
//       return state
//   }
// }

export function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action: any) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

export function getUserInfo(state: IAvatar = {}, action: IAction) {
  switch (action.type) {
    case ActionAvatar.LOAD_AVATAR:
      return { ...state, avatarUrl: action.avatarUrl }
    case ActionAvatar.LOAD_SENTENCE:
      return { ...state, sentence: action.sentence }
    case ActionAvatar.LOAD_USERINFO:
      return { ...state, ...action.userInfo }
    case ActionAvatar.LOGIN_REFRESH:
      return { ...state, receivedAt: Date.now(), loginState: true }
    case ActionAvatar.CLEAR_AVATAR:
      return { ...state, avatarUrl: '' }
    default:
      return state
  }
}

// function rootReducer(state: IStatePropTypes, action: any) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action),
//     userInfo: getUserInfo(state.userInfo, action)
//   }
// }

//注意上面的写法和下面完全等价：
const rootReducer = combineReducers({
  visibilityFilter,
  todos,
  userInfo: getUserInfo
})

export default rootReducer