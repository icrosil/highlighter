import React, { Component } from 'react';
import Editable from 'react-contenteditable';
import 'rangy/lib/rangy-textrange';
import rangy from 'rangy';

import Toolbar from './Toolbar';

import './Editor.css';

class ContentEditable extends Component {
  state = {
    html: `Hello World <br/>
      Hello World
      <div>Hello World</div>`,
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
    toggleSelection({
      text: textSelected,
      start,
      end,
    });
  };
  setRef = editor => {
    this.editor = editor;
  };
  highlightSelected = () => {
    const { html } = this.state;
    if (!this.editor) return html;
    const { selections } = this.props;
    const editorNode = this.editor.htmlEl;
    // const dupNode = editorNode.cloneNode(true);
    // console.log(this.editor, 'this.editor');
    // TODO find start of all selections
    selections.map(selection => {
      // editorNode.childNodes
      // TODO find start of selection
    });
    // editorNode.childNodes.forEach(node => {
    //   // TODO probably optimize loop
    //   const matchedSelection = selections.find((selection) => {
    //     console.log(selection, 'selection');
    //     return selection.start.block === node;
    //   });
    //   if (matchedSelection) {
    //     console.log('block found', node);
    //     console.log(matchedSelection, 'selection');
    //   }
    // });
    // console.log(dupNode.innerHTML, 'dupNode');
    // console.log(editorNode, 'this.editor.htmlEl');
    // console.log(html, 'html');
    // console.log(selections, 'selections');
    // TODO try change node and pass it
    return html;
  };
  render() {
    // TODO or try to change state ? on toggleSelection
    const html = this.highlightSelected();
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
