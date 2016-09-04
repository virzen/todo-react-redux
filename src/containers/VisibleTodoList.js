import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleTodo, removeTodo } from '../actions';
import store from '../store';
import TodoList from '../components/TodoList.js';

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

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    },
    onRemoveClick: (id) => {
      dispatch(removeTodo(id));
    }
  };
};

// const VisibleTodoList = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(TodoList);

class VisibleTodoList extends Component {
  componentDidMount() {
    // const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    // const { store } = this.context;
    const state = store.getState();

    return (
      <TodoList
        todos={getVisibleTodos(state.todos, state.visibilityFilter)}
        onTodoClick={id => {
          store.dispatch(toggleTodo(id));
        }}
        onRemoveClick={id => {
          store.dispatch(removeTodo(id));
        }}
      />
    );
  }
}
VisibleTodoList.contextTypes = {
  store: React.PropTypes.object,
};

export default VisibleTodoList;
