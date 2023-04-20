// import React from "react"
// import PropTypes from 'prop-types'

type TodoPropTypes<T = any> = {
  onClick: T
  completed: Boolean
  text: String
  id: Number
}

const Todo = ({ onClick, completed, text, id }: TodoPropTypes) => (
  <li onClick={onClick}
    style={{ color: completed ? 'red' : 'blue', padding: '6px 10px' }}>
    {`${text}--${id}`}
  </li>
)

export default Todo