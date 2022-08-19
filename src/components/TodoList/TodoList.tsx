import React from 'react';
import { TodoListProps } from '../../interfaces';
import TodoItem from '../TodoItem/TodoItem';

const TodoList: React.FC<TodoListProps> = ({
  todos,
  removeTodo,
  updateTodo,
}) => {
  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      ))}
    </>
  );
};

export default TodoList;
