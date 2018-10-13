import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';

import Editor from './Editor';
import Selections from './Selections';
import './Highlighter.css';

class Highlighter extends Component {
  state = {
    selections: [],
  };
  toggleSelection = selection => {
    if (!selection.text) return;
    const { selections } = this.state;
    const alreadyExist = selections.some(selectionCompare =>
      isEqual(selection, selectionCompare),
    );
    if (alreadyExist) {
      const filtered = selections.filter(
        selectionCompare => !isEqual(selection, selectionCompare),
      );
      this.setState({
        selections: filtered,
      });
    } else {
      this.setState({
        selections: [...selections, selection],
      });
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
