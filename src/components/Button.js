import React from 'react';

const Button = ({
  active,
  children,
  onClick,
}) => {
  if (active) {
    return (
      <span>{ children }</span>
    );
  }

  return (
    <button onClick={onClick}>
      { children }
    </button>
  );
}

export default Button;
