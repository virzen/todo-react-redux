import React from 'react';

const Todo = ({
  completed,
  text,
  onTodoClick,
  onRemoveClick,
}) => {
  return (
    <li>
      <span style={{
          textDecoration: completed ? 'line-through' : 'none',
        }}
        onClick={onTodoClick}
      >
        { text }
      </span>
      {' '}
      <button
        onClick={onRemoveClick}
        aria-label="Remove todo"
      >
        ×
      </button>
    </li>
  );
}

export default Todo;
