import Link from 'next/link';
import { useCart } from '../lib/cartState';
import { CartCount } from './CartCount';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
  console.log('nav rerender');
  const user = useUser();
  const { openCart } = useCart();

  const cartCount =
    user?.cart?.reduce(
      (tally, cartItem) => tally + (cartItem.product ? cartItem.quantity : 0),
      0
    ) || 0;

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user ? (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            My cart
            <CartCount count={cartCount} />
          </button>
        </>
      ) : (
        <Link href="/signin">Sign In</Link>
      )}
    </NavStyles>
  );
}
