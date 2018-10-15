import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import Editable from 'react-contenteditable';
import 'rangy/lib/rangy-textrange';
import rangy from 'rangy';

import { getRandomColor, hexAverage, invertColor } from './color';
import Toolbar from './Toolbar';

import './Editor.css';

class ContentEditable extends Component {
  handleChange = event => {
    const { updateSelections } = this.props;
    const text = event.currentTarget.innerText;
    const html = event.target.value;
    updateSelections(text, html);
  };
  highlight = () => {
    debugger;
    const { toggleSelection } = this.props;
    const selection = rangy.getSelection();
    const textSelected = selection.toString();
    if (!textSelected) return;
    const range = selection.getRangeAt(0);
    const { start, end } = range.toCharacterRange(this.editor.htmlEl);
    const selections = toggleSelection({
      start,
      end,
      color: getRandomColor(),
    });
    this.highlightSelected(selections);
  };
  setRef = editor => {
    this.editor = editor;
  };
  highlightSelected = selections => {
    const { html, setHtml } = this.props;
    if (!this.editor) return html;
    const editorNode = this.editor.htmlEl;
    const text = editorNode.innerText;
    function SplitHighlight({ value, highlightSelections }) {
      const sortedSelections = highlightSelections.sort(
        (selectionA, selectionB) => selectionA.start > selectionB.start,
      );
      const points = highlightSelections.map(({ start, end }) => [start, end]);
      const flatPoints = points.flat();
      const pointsFromStartToEnd = [0, ...flatPoints, value.length];
      const sortedPoints = pointsFromStartToEnd.sort(
        (pointA, pointB) => pointA > pointB,
      );
      const colorOverlap = sortedPoints.map(point => {
        const selectionsWithinPoint = sortedSelections.filter(
          selection => selection.start <= point && selection.end > point,
        );
        return selectionsWithinPoint.map(({ color }) => color);
      });
      const splittedBlocks = sortedPoints.map((point, index) => ({
        text: value.substring(point, sortedPoints[index + 1]),
        color: hexAverage(...colorOverlap[index]),
      }));
      return (
        <span>
          {splittedBlocks.map((block, key) => (
            <span
              key={key}
              style={{
                backgroundColor: block.color,
                color: invertColor(block.color),
              }}
            >
              {block.text}
            </span>
          ))}
        </span>
      );
    }
    const splittedHighlight = (
      <SplitHighlight value={text} highlightSelections={selections} />
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
