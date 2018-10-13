import React, { Component } from 'react';

import { Editor, findDOMRange } from 'slate-react';
import initialValue from './initialValue';
import './Editor.css';

class RichTextEditor extends Component {
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
        <h3>Simple Rich Editor</h3>
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
    // get all text - value.document.text
    // TODO get count of all marks in text
    // TODO get their position or texts
    this.setState({ value });
  };

  onSelect = (event, { value }, next) => {
    next();
  };

  getSelection = value => {
    const { focusText } = value;
    const domRange = findDOMRange(value.selection);
    const { startOffset, endOffset } = domRange;
    const text = focusText.text.slice(startOffset, endOffset);
    return {
      text, // text highlighted
      focusText, // Text object of element
      startOffset, // start point in Text
      endOffset, // end point in Text
    };
  };

  onClickMark = (event, type) => {
    event.preventDefault();
    const { addSelection } = this.props;
    this.editor.change(change => {
      const selection = this.getSelection(change.value);
      addSelection(selection);
      // TODO get range of selection within all text
      // TODO check overlapping
      // TODO make overlap logic
      change.toggleMark(type);
    });
  };
}

RichTextEditor.propTypes = {};

export default RichTextEditor;
