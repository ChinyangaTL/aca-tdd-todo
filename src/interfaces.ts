export interface Todo {
  userId?: number;
  id: number;
  completed: boolean;
  title: string;
}

export interface TodoListProps {
  todos: Todo[];
  removeTodo: (todoId: number) => void;
  updateTodo: (todoId: number) => void;
}

export interface TodoProps {
  todo: Todo;
  removeTodo: (todoId: number) => void;
  updateTodo: (todoId: number) => void;
}
