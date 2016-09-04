import React from 'react';
import store from '../store';
import { addTodo } from '../actions';

const AddTodo = () => {
  let input;

  return (
    <div>
      <input ref={node => { input = node }} />
      <button onClick={() => {
          store.dispatch(addTodo(input.value));
          input.value = '';
      }}>
        +
      </button>
    </div>
  );
};

export default AddTodo;
