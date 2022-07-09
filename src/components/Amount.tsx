import React from 'react';
interface prop {
  amount: number;
}
const Amount = ({ amount }: prop) => {
  return (
    <p className='amount'>
      <span>€</span>
      <span>{amount}</span>
    </p>
  );
};

export default Amount;
