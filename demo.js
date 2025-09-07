import ReactDOM from "react-dom";
import React from 'react';
import PaintMap from './examples/view';

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<PaintMap />, wrapper) : false;
