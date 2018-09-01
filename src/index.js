import React from 'react';
import ReactDOM from 'react-dom';
import AlphabetGame from './AlphabetGame';

ReactDOM.render(
    <AlphabetGame />, document.getElementById('app')
);

module.hot.accept();