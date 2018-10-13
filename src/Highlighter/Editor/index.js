import React, { Component } from 'react';

import { Editor } from 'slate-react';
import initialValue from './initialValue';
import './Editor.css';

class HighlightEditor extends Component {
  state = {
    value: initialValue,
  };

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  };

  ref = editor => {
    this.editor = editor;
  };

  render() {
    const { value } = this.state;
    return (
      <div className="editor">
        <h3>Simple Highlight Editor</h3>
        <div className="toolbar">
          {this.renderMarkButton('code', 'highlight')}
        </div>
        <Editor
          autoFocus
          placeholder="Enter some rich text..."
          ref={this.ref}
          value={value}
          onChange={this.onChange}
          onSelect={this.onSelect}
          renderMark={this.renderMark}
          className="slate"
        />
      </div>
    );
  }

  renderMarkButton = (type, icon) => {
    // TODO show somehow is current mode active and which selection it is
    // const isActive = this.hasMark(type);

    return (
      <button onMouseDown={event => this.onClickMark(event, type)}>
        {icon}
      </button>
    );
  };

  renderMark = (props, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'code':
        return <code {...attributes}>{children}</code>;
      default:
        return next();
    }
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  // TODO remove if not needed
  onSelect = (event, { value }, next) => {
    next();
  };

  getSelection = value => {
    const { focusText } = value;
    const { selection } = value;
    const { start, end } = selection;
    const { offset: startOffset } = start;
    const { offset: endOffset } = end;
    const text = focusText.text.slice(startOffset, endOffset);
    return {
      text, // text highlighted
      key: focusText.key, // key of Object
      // TODO make sure i can highlight with different cases
    };
  };

  onClickMark = (event, type) => {
    event.preventDefault();
    const { toggleSelection } = this.props;
    this.editor.change(change => {
      const selection = this.getSelection(change.value);
      toggleSelection(selection);
      // TODO get range of selection within all text
      // TODO check overlapping
      // TODO make overlap logic
      change.toggleMark(type);
    });
  };
}

HighlightEditor.propTypes = {};

export default HighlightEditor;
