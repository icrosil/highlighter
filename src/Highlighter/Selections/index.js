import React from 'react';

import Selection from './Selection';
import './Selections.css';

const Selections = ({ selections }) => (
  <section className="selections">
    {selections.map((selection, index) => (
      <Selection key={index} selection={selection} index={index} />
    ))}
  </section>
);

Selections.propTypes = {};

export default Selections;
