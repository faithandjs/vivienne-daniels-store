import Layout from '@/components/Layout';
import '../styles/cart.scss';
import useStore from '@/context/StoreContext';

const Cart = () => {
  const {cart} = useStore()
  console.log(cart)
  return (
    <Layout page='cart'>
      <>
        <p className="title">cart</p>
      </>
    </Layout>
  );
};

export default Cart;
