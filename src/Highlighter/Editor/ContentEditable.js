import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import Editable from 'react-contenteditable';

import { getRandomColor } from './color';
import Toolbar from './Toolbar';
import { getSelectionOffset } from '../utils/rangy';
import HighlightedText from './HighlightedText';

import './Editor.css';

class ContentEditable extends Component {
  handleChange = event => {
    const { updateSelections } = this.props;
    const text = event.currentTarget.innerText;
    const html = event.target.value;
    updateSelections(text, html);
  };
  highlight = () => {
    const { toggleSelection } = this.props;
    const { start, end, text } = getSelectionOffset(this.editor.htmlEl);
    if (!text) return;
    const selections = toggleSelection({
      start,
      end,
      color: getRandomColor(),
    });
    this.highlightSelected(selections);
  };
  setRef = editor => {
    const { setRef } = this.props;
    this.editor = editor;
    setRef(editor);
  };
  highlightSelected = selections => {
    const { html, setHtml } = this.props;
    if (!this.editor) return html;
    const editorNode = this.editor.htmlEl;
    const text = editorNode.innerText;
    const splittedHighlight = (
      <HighlightedText value={text} highlightSelections={selections} />
    );
    const resultText = ReactDOMServer.renderToString(splittedHighlight);
    const resultWithNewLines = resultText.replace(/(?:\r\n|\r|\n)/g, '<br />');
    setHtml(resultWithNewLines);
  };
  render() {
    const { html } = this.props;
    return (
      <div className="editor">
        <h3>Simple Highlight Editor</h3>
        <Toolbar className="toolbar" highlight={this.highlight} />
        <Editable
          html={html}
          disabled={false}
          onChange={this.handleChange}
          tagName="article"
          className="editable"
          ref={this.setRef}
        />
      </div>
    );
  }
}

export default ContentEditable;
