import React from 'react';
import Todo from './Todo.js';

const TodoList = ({
  todos,
  onTodoClick,
  onRemoveClick,
}) => {
  return (
    <ul>
      {todos.map(todo =>
        <Todo
          key={todo.id}
          completed={todo.completed}
          text={todo.text}
          onTodoClick={() => onTodoClick(todo.id)}
          onRemoveClick={() => onRemoveClick(todo.id)}
        />
      )}
    </ul>
  );
};

export default TodoList;
