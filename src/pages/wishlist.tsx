import Layout from '@/components/Layout';
import '../styles/wishlist.scss';
import useStoreContext from '@/context/context';
import {  productProp } from 'type';
import { WishlistCard } from '@/components/WishListCard';

const Wishlist = () => {
  const { wishlist, setfilling } = useStoreContext();

  return (
    <Layout page="wishlist">
      <>
        <div className="title">Wishlist</div>
        <ul className="WL-list productItems">
          {wishlist.length > 0 ? (
            wishlist.map((item: productProp, index: number) => {
              let fill = setfilling(item.node.title);
              return (
                <li key={index} className="product-card">
                  <WishlistCard product={item} fill={fill} />
                </li>
              );
            })
          ) : (
            <div className="empty">your wishlist is empty</div>
          )}
        </ul>
      </>
    </Layout>
  );
};

export default Wishlist;
