import React from 'react';

import Text from './Text';
import Selections from './Selections';
import './Highlighter.css';

const Highlighter = () => (
  <main className="highlighter">
    <Text />
    <Selections />
  </main>
);

Highlighter.propTypes = {};

export default Highlighter;
