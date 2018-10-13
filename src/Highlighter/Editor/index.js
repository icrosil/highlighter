import React, { Component } from 'react';
import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';

import './Editor.css';

// TODO separate state from view
const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
});

class Editor extends Component {
  state = {
    value: initialValue,
  };

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    this.setState({ value });
  };
  render() {
    const { value } = this.state;
    return (
      <section className="editor">
        <h3>Simple Rich Editor</h3>
        <SlateEditor onChange={this.onChange} value={value} className="slate" />
      </section>
    );
  }
}

Editor.propTypes = {};

export default Editor;
