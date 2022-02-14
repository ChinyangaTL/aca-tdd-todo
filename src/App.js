import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import TodoList from './components/TodoList/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTodo = {
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
      const data = await res.json();
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
    setTodos(data.slice(0, 5));
    setIsLoading(false);
  };

  const removeTodo = id => setTodos(todos.filter(todo => todo.id !== id))

  const updateTodo = (id) => {
    const newTodos = todos.map(todo => {
      if(todo.id === id) {
        const updatedTodo = {...todo, completed: !todo.completed}
        return updatedTodo
      } return todo
    })
    setTodos(newTodos)
  }

  useEffect(() => {
    fetchTodos();
  }, []);


  return (
    <div className="App">
      <h1 className="header">My Todos</h1>
      {isLoading ? <p>loading...</p> : <TodoList todos={todos} removeTodo={removeTodo} updateTodo={updateTodo}/>}

      <div className="add-todo-form">
        <form onSubmit={handleSubmit}>
          <input
            aria-label="addTodoInput"
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            id="addTodoInput"
            name="addTodoInput"
          />
          <button type="submit">Add new todo</button>
        </form>
      </div>
    </div>
  );
}

export default App;
