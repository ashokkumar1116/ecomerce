import { useSelector } from 'react-redux';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import PaymentForm from '../../components/payment-form/payment-form.component'
import './checkout.styles.scss'
import { selectCurrentUser } from '../../store/user/user.selector';
import Button from '../../components/button/button.component';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const signinHandler = () => {
    navigate('/auth?checkout');
  };

  console.log(user)

  return (
    
    <div className='checkout-container'>
        <div className='checkout-header'>
          <div className='header-block '>
            <span>Product</span>
          </div>
          <div className='header-block '>
            <span>Description</span>
          </div>
          <div className='header-block '>
            <span>Quantity</span>
          </div>
          <div className='header-block '>
            <span>Price</span>
          </div>
          <div className='header-block '>
            <span>Remove </span>
          </div>
        </div>
        {
          cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem }/>)
        }
      <span className='total'>Total: $  {cartTotal}</span>
      {
        cartItems.length > 0 &&  (user?<PaymentForm />:<Button onClick={signinHandler}>Login</Button>)
      }
      
    </div>
  );
}

export default Checkout;