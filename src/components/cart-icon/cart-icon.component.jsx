import { CartIconContainer, ItemCount, ShoppingIconSVG} from  './cart-icon.styles';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';


const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen)
  const cartCount = useSelector(selectCartCount)

  const tooggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))
  return (
    <CartIconContainer onClick={tooggleIsCartOpen}>
      <ShoppingIconSVG />
      <ItemCount className='item-count'>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;