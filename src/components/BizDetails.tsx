import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BizDetailsType } from '../types';

interface BizDetailsProps {
  businesses: BizDetailsType[]
}

interface BizDetailsParams {
  id: string
}

const BizDetails = (props: BizDetailsProps) => {
  const { id } = useParams<BizDetailsParams>();
  const currentBiz = props.businesses.find(biz => biz.id === id)

  if (!currentBiz) {
    return (
      <div>
        <h1>Business not found!</h1>
        <Link to='/'>Back to search</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{currentBiz.name}</h1>
      <p>Rating: {currentBiz.rating} from {currentBiz.review_count} reviews</p>
      {currentBiz.price && <p>Price: {currentBiz.price}</p>}
      <p>Distance: {(currentBiz.distance/1609).toFixed(2)} miles</p>
      {currentBiz.phone && <p>Phone number: {currentBiz.phone}</p>}
      {currentBiz.address &&
        <div>Address: {currentBiz.address.map((line, index) => <p key={index}>{line}</p>)}</div>
      }
    </div>
  );
};

export default BizDetails;
