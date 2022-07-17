import React from 'react';
import { Context } from './context';

const CombinedProvider = ({ element }) => {
  return <Context>{element}</Context>;
};

export default CombinedProvider;
