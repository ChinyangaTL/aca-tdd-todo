import React from 'react'
import TodoItem from "../TodoItem/TodoItem";

const TodoList = ({ todos, removeTodo, updateTodo }) => {
  return (
    <>
    {todos.map((todo) => <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} updateTodo={updateTodo} />)}
    </>
  )
}

export default TodoList

