interface IAction {
  type: string
  [key: string]: any
}

interface IState {
  visibilityFilter: string
  todos: ITodoItem[]
  userInfo: IAvatar
}

interface IAvatar {
  avatarUrl?: string
  sentence?: string
  color?: string
  receivedAt?: number
  loginState?: boolean
}

interface ITodoItem {
  id: Number
  completed: Boolean
  text: String
}

// declare const enum ACT {
//   SAY_HELLO = "SAY_HELLO",
//   INC_BY = "INC_BY",
// }

// type IActionPayloadMapping = {
//   [ACT.SAY_HELLO]: { msg: string };
//   [ACT.INC_BY]: { count: number };
// };

// type IActionPayload<T> = T extends keyof IActionPayloadMapping ? IActionPayloadMapping[T] : any

// type IAction = {
//   [key in keyof typeof ACT]: {
//     type: typeof ACT[key];
//     payload?: IActionPayload<typeof ACT[key]>;
//   };
// }[keyof typeof ACT];
