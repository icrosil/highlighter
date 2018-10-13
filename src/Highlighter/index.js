import React, { Component } from 'react';

import Editor from './Editor';
import Selections from './Selections';
import './Highlighter.css';

class Highlighter extends Component {
  state = {
    selections: [],
  };
  addSelection = selection => {
    const { selections } = this.state;
    this.setState({
      selections: [...selections, selection],
    });
  };
  render() {
    const { selections } = this.state;
    return (
      <main className="highlighter">
        <Editor addSelection={this.addSelection} />
        <Selections selections={selections} />
      </main>
    );
  }
}

Highlighter.propTypes = {};

export default Highlighter;
