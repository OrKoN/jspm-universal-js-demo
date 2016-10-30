import React from 'react';

export default class extends React.Component {
  onClick() {
    alert('On click');
  }

  render() {
    return <div>
        <h2>
          Hello World!
        </h2>
        <button onClick={this.onClick}>
          Click me
        </button>
      </div>;
  }
}