import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    onAddClick: (input) => {
      dispatch(addTodo(input.value));
      input.value = '';
    },
  };
};

let AddTodo = ({
  onAddClick,
}) => {
  let input;

  return (
    <div>
      <input ref={node => { input = node }} />
      <button onClick={() => onAddClick(input)}>
        +
      </button>
    </div>
  );
};

AddTodo = connect(
  undefined,
  mapDispatchToProps
)(AddTodo);

export default AddTodo;
