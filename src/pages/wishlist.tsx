import Layout from '@/components/Layout';
import '../styles/wishlist.scss';
import useStoreContext from '@/context/context';
import { productCardProp, productProp } from 'type';
import { WishlistCard } from '@/components/WishListCard';

const Wishlist = () => {
  const { editWishlist, wishlist, setfilling } = useStoreContext();
  const reverse = wishlist.reverse();
  return (
    <Layout page="wishlist">
      <>
        <div className="title">Wishlist</div>
        <ul className="WL-list productItems">
          {wishlist.length > 0 ? (
            reverse.map((item: productProp, index: number) => {
              let fill = setfilling(item.node.title);
              let num = Math.round(Math.random() * 50) / 10;
              let people = String(num) + 'k';
              if (String(num)[0] === '0' && String(num).length > 1) {
                people = String(num)[2] + 'k';
              }
              return (
                <li key={index} className="product-card">
                  <WishlistCard product={item} fill={fill} people={people} />
                </li>
              );
            })
          ) : (
            <div className="no-WL">your wishlist is empty</div>
          )}
        </ul>
      </>
    </Layout>
  );
};

export default Wishlist;
