import React from 'react';

import { StoreProvider } from './StoreContext';
import { Context } from './context';

const CombinedProvider = ({ element }: any) => {
  return (
    <Context>
      <StoreProvider>{element}</StoreProvider>
    </Context>
  );
};
//<StoreProvider>{element}</StoreProvider>
export default CombinedProvider;
