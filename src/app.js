import React from 'react';
import ReactDOM from 'react-dom';
import Pomodoro from './components/Pomodoro.js';

import 'normalize.css/normalize.css'; // reset all browser conventions
import './styles/styles.scss';

ReactDOM.render(<Pomodoro />, document.getElementById('app'));