import todo from './todo.js';

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

export default todos;
