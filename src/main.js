import React, { Component } from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import configureStore from './configureStore';

const store = configureStore();

render(
  <Root store={store} />,
  document.querySelector('.app')
);
