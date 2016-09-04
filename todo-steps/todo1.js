import expect from 'expect';
import deepFreeze from 'deep-freeze';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createStore } from 'redux'

const toggleTodo = (todo) => {
  return Object.assign({}, todo, {
    completed: !todo.completed
  });
};

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'test',
    completed: false,
  };
  const todoAfter = {
    id: 0,
    text: 'test',
    completed: true,
  };

  deepFreeze(todoBefore);

  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter);
};

testToggleTodo();
console.log('All test passed!');
