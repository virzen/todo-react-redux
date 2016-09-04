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

let nextTodoId = 0;
class TodoApp extends Component {
  render() {
    return (
      <div>
        <input ref={node => { this.input = node }} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text: this.input.value,
          });
          this.input.value = '';
        }}>
          +
        </button>
        <ul>
          {this.props.todos.map(todo =>
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => {
                store.dispatch({
                  type: 'REMOVE_TODO',
                  id: todo.id,
                });
              }}>x</button>
            </li>

          )}
        </ul>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp todos={store.getState().todos} />,
    document.querySelector('.app')
  );
};

store.subscribe(render);
render();
