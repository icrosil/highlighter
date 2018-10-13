import React from 'react';

import Selection from './Selection';
import './Selections.css';

const Selections = ({ selections }) => (
  <section className="selections">
    <h4>User Selections:</h4>
    {selections.map((selection, index) => (
      <Selection key={index} selection={selection} index={index} />
    ))}
  </section>
);

Selections.propTypes = {};

export default Selections;
