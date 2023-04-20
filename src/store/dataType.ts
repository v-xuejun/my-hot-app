
export interface IStatePropTypes {
  visibilityFilter: string
  todos: ITodoItem[]
  userInfo: IAvatar
}

export interface ITodoItem {
  id: Number
  completed: Boolean
  text: String
}

export interface IAvatar {
  avatarUrl: string
  sentence: string
  receivedAt: number
}