import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button.js';
import store from '../store';
import { setVisibilityFilter } from '../actions';

class FilterButton extends Component {
  componentDidMount() {
    this.usubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <Button
        active={props.filter === state.visibilityFilter}
        onClick={() => {
          store.dispatch(setVisibilityFilter(props.filter));
        }}
      >
        { props.children }
      </Button>
    );
  }
}

export default FilterButton;
