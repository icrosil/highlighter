import React from 'react';

const Selection = ({ selection, index }) => (
  <div>
    <div>{index}</div>
    {selection.text}
  </div>
);

Selection.propTypes = {};

export default Selection;
