import React from 'react';
import Products from '@/pages/products';
import { Link } from 'gatsby';
interface prop {
    children: JSX.Element
}
const Layout = ({children}: prop) => {
  return (
    <>
      <header>
        header, add menu 
        <Link to="/products">
          <span>products</span>
        </Link>
      </header>
      {children}
      <footer>footer, add cc and contact details</footer>
    </>
  );
};

export default Layout;
