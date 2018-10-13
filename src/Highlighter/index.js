import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';

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
  removeSelection = selection => {
    const { selections } = this.state;
    const filtered = selections.filter(
      selectionCompare => !isEqual(selection, selectionCompare),
    );
    this.setState({
      selections: filtered,
    });
  };
  toggleSelection = selection => {
    if (!selection.text) return;
    const { selections } = this.state;
    console.log(selection, 'selection');
    console.log(selections, 'selections');
    // TODO is it overlapping current selections ?
    const alreadyExist = selections.some(selectionCompare =>
      isEqual(selection, selectionCompare),
    );
    if (alreadyExist) {
      this.removeSelection(selection);
    } else {
      this.addSelection(selection);
    }
  };
  render() {
    const { selections } = this.state;
    return (
      <main className="highlighter">
        <Editor toggleSelection={this.toggleSelection} />
        <Selections selections={selections} />
      </main>
    );
  }
}

Highlighter.propTypes = {};

export default Highlighter;
