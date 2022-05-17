import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { CartIconContainer, ItemCount, ShoppingIconSVG} from  './cart-icon.styles';
import {useContext} from 'react'
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
  const {isCartOpen ,setIsCartOpen, cartCount} = useContext(CartContext)

  

  const tooggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen)
  }
  return (
    <CartIconContainer onClick={tooggleIsCartOpen}>
      <ShoppingIconSVG />
      <ItemCount className='item-count'>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;