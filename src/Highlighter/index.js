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
    const newSelections = [...selections, selection];
    this.setState({
      selections: newSelections,
    });
    return newSelections;
  };
  removeSelection = selection => {
    const { selections } = this.state;
    const filtered = selections.filter(
      selectionCompare => !isEqual(selection, selectionCompare),
    );
    this.setState({
      selections: filtered,
    });
    return filtered;
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
      return this.removeSelection(selection);
    } else {
      return this.addSelection(selection);
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
