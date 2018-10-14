import React, { Component } from 'react';

import Editor from './Editor/ContentEditable';
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
      selectionCompare =>
        selection.text !== selectionCompare.text ||
        selection.start !== selectionCompare.start ||
        selection.end !== selectionCompare.end,
    );
    this.setState({
      selections: filtered,
    });
    return filtered;
  };
  toggleSelection = selection => {
    if (!selection.text) return;
    const { selections } = this.state;
    const alreadyExist = selections.some(
      selectionCompare =>
        selection.text === selectionCompare.text &&
        selection.start === selectionCompare.start &&
        selection.end === selectionCompare.end,
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
