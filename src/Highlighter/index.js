import React, { Component } from 'react';
import diff from 'fast-diff';
import 'rangy/lib/rangy-textrange';
import rangy from 'rangy';

import Editor from './Editor/ContentEditable';
import Selections from './Selections';
import './Highlighter.css';

class Highlighter extends Component {
  state = {
    selections: [],
    // html view
    html: '',
    // string view
    text: '',
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
        selection.start !== selectionCompare.start ||
        selection.end !== selectionCompare.end,
    );
    this.setState({
      selections: filtered,
    });
    return filtered;
  };
  toggleSelection = selection => {
    const { selections } = this.state;
    const alreadyExist = selections.some(
      selectionCompare =>
        selection.start === selectionCompare.start &&
        selection.end === selectionCompare.end,
    );
    if (alreadyExist) {
      return this.removeSelection(selection);
    } else {
      return this.addSelection(selection);
    }
  };
  setRef = editor => {
    this.editor = editor;
  };
  updateSelections = (text, html) => {
    const { selections, text: oldText } = this.state;
    const selection = rangy.getSelection();
    const range = selection.getRangeAt(0);
    const { start } = range.toCharacterRange(this.editor.htmlEl);
    const textDiff = diff(oldText, text, start);
    let currentPosition = 0;
    const diffWithPoints = textDiff.map(([status, text]) => {
      const update = {
        status,
        text,
        start: currentPosition,
        end: currentPosition + text.length,
      };
      currentPosition += text.length;
      return update;
    });
    const newChanges = diffWithPoints.filter(point => point.status !== 0);
    const newSelections = selections.map(selection => {
      const updatedSelection = { ...selection };
      newChanges.forEach(({ text, status, end, start }) => {
        const size = end - start;
        if (end <= selection.start) {
          updatedSelection.start += size * status;
          updatedSelection.end += size * status;
        }
        if (
          start <= selection.start &&
          end < selection.end &&
          end > selection.start
        ) {
          updatedSelection.end += size * status;
        }
        // change inside
        if (start > selection.start && end < selection.end) {
          updatedSelection.end += size * status;
        }
        // change inside and before
        if (
          start < selection.start &&
          end <= selection.end &&
          end > selection.start
        ) {
          updatedSelection.start += (end - selection.start) * status;
          updatedSelection.end += size * status;
        }
        // change inside and after
        if (
          start > selection.start &&
          start <= selection.end &&
          end >= selection.end
        ) {
          updatedSelection.end += (selection.end - start) * status;
        }
        // change totally removes selection
        if (start <= selection.start && end >= selection.end) {
          updatedSelection.start = null;
          updatedSelection.end = null;
        }
      });
      return updatedSelection;
    });
    const nonEmptySelections = newSelections.filter(
      selection => selection.start !== null && selection.end !== null,
    );
    this.setState({
      selections: nonEmptySelections,
      html,
      text,
    });
  };
  render() {
    const { selections, html, text } = this.state;
    return (
      <main className="highlighter">
        <Editor
          html={html}
          text={text}
          updateSelections={this.updateSelections}
          toggleSelection={this.toggleSelection}
          setHtml={html => this.setState({ html })}
          setRef={this.setRef}
        />
        <Selections text={text} selections={selections} />
      </main>
    );
  }
}

Highlighter.propTypes = {};

export default Highlighter;
