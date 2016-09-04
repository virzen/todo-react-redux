import expect from 'expect';
import deepFreeze from 'deep-freeze';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createStore } from 'redux'

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

};

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'test',
  };
  const stateAfter = [{
    id: 0,
    text: 'test',
    completed: false,
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'test',
      completed: false,
    },
    {
      id: 1,
      text: 'test2',
      completed: false,
    },
  ];
  const action = {
    type: 'TOGGLE_TODO',
    id: 0,
  };
  const stateAfter = [
    {
      id: 0,
      text: 'test',
      completed: true,
    },
    {
      id: 1,
      text: 'test2',
      completed: false,
    },
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};

const testRemoveTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'test',
      completed: false,
    },
    {
      id: 1,
      text: 'test2',
      completed: false,
    },
  ];
  const action = {
    type: 'REMOVE_TODO',
    id: 0,
  };
  const stateAfter = [
    {
      id: 1,
      text: 'test2',
      completed: false,
    },
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};

const testVisibilityFilter = () => {
  const stateBefore = undefined;
  const action = {
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED'
  };
  const stateAfter = 'SHOW_COMPLETED';

  expect(
    visibilityFilter(stateBefore, action)
  ).toEqual(stateAfter);
};

testAddTodo();
testToggleTodo();
testRemoveTodo();
testVisibilityFilter();
console.log('All test passed!');
