import React from 'react';

import Editor from './Editor';
import Selections from './Selections';
import './Highlighter.css';

const Highlighter = () => (
  <main className="highlighter">
    <Editor />
    <Selections />
  </main>
);

Highlighter.propTypes = {};

export default Highlighter;
