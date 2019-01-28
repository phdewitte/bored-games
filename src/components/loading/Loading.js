import React from 'react';
import { PacmanLoader } from 'react-spinners';
import './Loading.scss';

const Loading = () => (
  <div className="loading">
    <PacmanLoader color="#245e8d" />
  </div>
);

export default Loading;
