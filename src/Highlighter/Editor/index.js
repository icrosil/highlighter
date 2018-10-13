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
    const isActive = this.hasMark(type);

    // TODO show somehow is current mode active and which selection it is
    return (
      <button
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
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

  onSelect = (event, { value }, next) => {
    const domRange = findDOMRange(value.selection);
    const { startOffset, endOffset } = domRange;
    console.log(startOffset, 'startOffset');
    console.log(endOffset, 'endOffset');
    console.log(domRange, 'rest');
    next();
  };

  onClickMark = (event, type) => {
    event.preventDefault();

    this.editor.change(change => {
      change.toggleMark(type);
    });
  };
}

RichTextEditor.propTypes = {};

export default RichTextEditor;
