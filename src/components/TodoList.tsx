import Todo from './Todo'

interface todoItem {
  id: Number
  completed: Boolean
  text: String
}

type TodoListpropTypes = {
  todos: todoItem[]
  onTodoClick: any
}

const TodoList = ({ todos, onTodoClick }: TodoListpropTypes) => (

  <ul>
    {todos.map((todo, index) => (
      <Todo key={index} {...todo} onClick={() => onTodoClick(index)} />
    ))}
  </ul>
)


export default TodoList