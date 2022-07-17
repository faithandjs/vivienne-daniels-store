import React from 'react';
import { Context } from './context';

const CombinedProvider = ({ element }: any) => {
  return <Context>{element}</Context>;
};
//<StoreProvider>{element}</StoreProvider>
export default CombinedProvider;
