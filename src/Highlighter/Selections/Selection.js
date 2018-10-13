import React from 'react';

const Selection = ({ selection, index }) => (
  <div>
    <div>
      <b>Selection {index + 1}:</b>
    </div>
    <code>{selection.text}</code>
  </div>
);

Selection.propTypes = {};

export default Selection;
