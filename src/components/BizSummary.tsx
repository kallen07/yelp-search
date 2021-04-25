import React from 'react';
import { BizSummaryType } from '../types';
import { Link } from 'react-router-dom';

const BizSummary = (props: BizSummaryType) => {
  return(
    <div>
      <h3>{props.name}</h3>
      <p>Rating: {props.rating}</p>
      <p>Distance: {(props.distance/1609).toFixed(2)} miles</p>
      <Link to={`/details/${props.id}`}>See details</Link>
    </div>
  );
};

export default BizSummary;
