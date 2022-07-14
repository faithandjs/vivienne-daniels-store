import React from 'react';
import useStoreContext from '@/context/context';
import { productCardProp } from 'type';

const Heart = ({ product, fill }: productCardProp) => {
  const { editWishlist } = useStoreContext();
  return (
    <div
      className="addToWL"
      onClick={() => {
        editWishlist(product);
      }}
      title='add to wishlist'
    >
      <svg viewBox="0 0 40 40">
        <path
          fill={fill}
          stroke="#ff0000"
          strokeWidth="1"
          d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
        />
      </svg>
    </div>
  );
};

export default Heart;
