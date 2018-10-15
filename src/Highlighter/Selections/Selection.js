import React from 'react';

const Selection = ({ selection, index, text }) => (
  <div>
    <div>
      <b>Selection {index + 1}:</b>
    </div>
    <code>{text.substring(selection.start, selection.end)}</code>
  </div>
);

Selection.propTypes = {};

export default Selection;
