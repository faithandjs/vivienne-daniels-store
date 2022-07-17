import React from 'react';
import { Context } from './context';

const CombinedProvider = ({ element }: any) => {
  return <Context>{element}</Context>;
};

export default CombinedProvider;
