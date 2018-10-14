import React from 'react';

const Toolbar = ({ className, highlight }) => (
  <div className={className}>
    <button onClick={highlight}>highlight</button>
  </div>
);

Toolbar.propTypes = {};

export default Toolbar;
