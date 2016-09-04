import expect from 'expect';
import deepFreeze from 'deep-freeze';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
      break;
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return Object.assign({}, state, {
        completed: !state.completed,
      });
      break;
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action),
      ];
      break;
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
      break;
    case 'REMOVE_TODO':
      return state.filter(t => t.id !== action.id);
      break;
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
      break;
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  visibilityFilter,
});

const store = createStore(todoApp, window.devToolsExtension && window.devToolsExtension());

const getVisibleTodos = (todos, visibilityFilter) => {
  switch (visibilityFilter) {
    case 'SHOW_ALL':
      return todos;
      break;
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
      break;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
      break;
  }
}

const FilterButton = ({
  filter,
  currentFilter,
  children,
  onClick,
}) => {
  if (filter === currentFilter) {
    return (
      <span>{ children }</span>
    );
  }

  return (
    <a href="#"
      onClick={e => {
        e.preventDefault();
        onClick(filter);
      }}
    >
      { children }
    </a>
  );
};

const Todo = ({
  completed,
  text,
  onClick,
}) => {
  return (
    <li style={{
        textDecoration: completed ? 'line-through' : 'none',
      }}
      onClick={onClick}
    >
        { text }
    </li>
  );
}

const TodoList = ({
  todos,
  onTodoClick,
}) => {
  return (
    <ul>
      {todos.map(todo =>
        <Todo
          key={todo.id}
          completed={todo.completed}
          text={todo.text}
          onClick={() => onTodoClick(todo.id)}
        />
      )}
    </ul>
  );
};

const AddTodo = ({
  onAddClick
}) => {
  let input;

  return (
    <div>
      <input ref={node => { input = node }} />
      <button onClick={() => {
        onAddClick(input.value);
        input.value = '';
      }}>
        +
      </button>
    </div>
  );
};

const Footer = ({
  visibilityFilter,
  onFilterClick,
}) => {
  return (
    <p>
      <FilterButton
        filter="SHOW_ALL"
        currentFilter={visibilityFilter}
        onClick={onFilterClick}
      >
        All
      </FilterButton>
      {' '}
      <FilterButton
        filter="SHOW_ACTIVE"
        currentFilter={visibilityFilter}
        onClick={onFilterClick}
      >
        Active
      </FilterButton>
      {' '}
      <FilterButton
        filter="SHOW_COMPLETED"
        currentFilter={visibilityFilter}
        onClick={onFilterClick}
      >
        Completed
      </FilterButton>
    </p>
  );
};

let nextTodoId = 0;
const TodoApp = ({
  todos,
  visibilityFilter,
}) => (
  <div>
    <AddTodo
      onAddClick={text => {
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text,
        });
      }}
    />
    <TodoList
      todos={getVisibleTodos(
        todos,
        visibilityFilter,
      )}
      onTodoClick={id => {
        store.dispatch({
          type: 'TOGGLE_TODO',
          id,
        });
      }}
    />
    <Footer
      visibilityFilter={visibilityFilter}
      onFilterClick={filter => {
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter,
        });
      }}
    />
  </div>
);

const render = () => {
  ReactDOM.render(
    <TodoApp
      todos={store.getState().todos}
      visibilityFilter={store.getState().visibilityFilter}
    />,
    document.querySelector('.app')
  );
};

store.subscribe(render);
render();
