import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import TodoList from './components/TodoList/TodoList';
import { Todo } from './interfaces';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      userId: 2,
      id: Math.floor(Math.random()),
      title: inputValue,
      completed: false,
    };

    const config = {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };

    try {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
        config
      );
      const data: Todo = await res.json();

      setTodos([...todos, data]);
      setInputValue('');
    } catch (error) {
      setInputValue('');
      return error;
    }
  };

  const fetchTodos = async () => {
    setIsLoading(true);
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await res.json();
    console.log({ data });
    setTodos(data.slice(0, 5));
    setIsLoading(false);
  };

  const removeTodo = (id: number): void =>
    setTodos(todos.filter((todo) => todo.id !== id));

  const updateTodo = (id: number): void => {
    const newTodos = todos.map((todo: Todo) => {
      if (todo.id === id) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        return updatedTodo;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className='App'>
      <h1 className='header'>My Todos</h1>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <TodoList
          todos={todos}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      )}

      <div className='add-todo-form'>
        <form onSubmit={handleSubmit}>
          <input
            aria-label='addTodoInput'
            type='text'
            onChange={(e) => setInputValue(e.target.value)}
            id='addTodoInput'
            name='addTodoInput'
          />
          <button type='submit'>Add new todo</button>
        </form>
      </div>
    </div>
  );
}

export default App;
