import React from 'react';
import { Link } from 'react-router-dom';
import './Error.scss';

const Error = () => (
  <div className="error">
    <h2>Whoops! There was an issue finding that game!</h2>
    {/* eslint-disable jsx-a11y/anchor-is-valid */}
    <Link to="/">Please go back and try another</Link>
  </div>
);

export default Error;
