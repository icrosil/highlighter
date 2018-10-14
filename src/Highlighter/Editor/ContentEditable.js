import React, { Component, Fragment } from 'react';
import ReactDOMServer from 'react-dom/server';
import Editable from 'react-contenteditable';
import 'rangy/lib/rangy-textrange';
import rangy from 'rangy';

import Toolbar from './Toolbar';

import './Editor.css';

class ContentEditable extends Component {
  state = {
    html: `Hello World <br/>
    Hello World <br />
    Hello World`,
  };
  handleChange = event => {
    this.setState({ html: event.target.value });
  };
  highlight = () => {
    const { toggleSelection } = this.props;
    const selection = rangy.getSelection();
    const textSelected = selection.toString();
    const range = selection.getRangeAt(0);
    const { start, end } = range.toCharacterRange(this.editor.htmlEl);
    const selections = toggleSelection({
      text: textSelected,
      start,
      end,
    });
    this.highlightSelected(selections);
  };
  setRef = editor => {
    this.editor = editor;
  };
  highlightSelected = selections => {
    const { html } = this.state;
    if (!this.editor) return html;
    const editorNode = this.editor.htmlEl;
    const text = editorNode.innerText;
    const [selection] = selections;
    // TODO split all selections into smallest with overlapped colors
    function SplitOneHighlight({ value, text, start, end }) {
      const before = value.substring(0, start);
      const after = value.substring(end);
      return (
        <span>
          {before}
          <b>{text}</b>
          {after}
        </span>
      );
    }
    const splittedHighlight = <SplitOneHighlight value={text} {...selection} />;
    const resultText = ReactDOMServer.renderToString(splittedHighlight);
    const resultWithNewLines = resultText.replace(/(?:\r\n|\r|\n)/g, '<br />');
    this.setState({
      html: resultWithNewLines,
    });
  };
  render() {
    const { html } = this.state;
    return (
      <div className="editor">
        <h3>Simple Highlight Editor</h3>
        <Toolbar className="toolbar" highlight={this.highlight} />
        <Editable
          html={html}
          disabled={false}
          onChange={this.handleChange}
          tagName="article"
          className="slate"
          ref={this.setRef}
        />
      </div>
    );
  }
}

export default ContentEditable;
