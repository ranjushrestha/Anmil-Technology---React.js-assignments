import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  increment = () => {
    // Update state and call callback after state is updated
    this.setState(
      (prevState) => ({ count: prevState.count + 1 }),
      () => {
        // Call parent callback if provided
        if (this.props.onIncrement) {
          this.props.onIncrement(this.state.count);
        }
      }
    );
  };

  decrement = () => {
    this.setState(
      (prevState) => ({ count: prevState.count - 1 }),
      () => {
        // Call parent callback if provided
        if (this.props.onDecrement) {
          this.props.onDecrement(this.state.count);
        }
      }
    );
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>Counter: {this.state.count}</h2>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

export default Counter;
