import { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { useSelector, useDispatch } from 'react-redux';
// import { BUTTON_TYPE_CLASSES } from '../button/button.component';
// import { selectCartTotal } from '../../store/cart/cart.selector';
// import { selectCurrentUser } from '../../store/user/user.selector';
// import { PaymentButton, PaymentFormContainer, FormContainer } from './payment-form.styles';
// import { clearCart } from '../../store/cart/cart.action';

const PaymentForm = () => {
  // const stripe =useStripe();
  // const elements =useElements();
  // const amount = useSelector(selectCartTotal);
  // const currentUser = useSelector(selectCurrentUser);
  // const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  // const dispatch = useDispatch();

  // const paymentHandler = async (e) => {
  //   e.preventDefault();

  //   if(!stripe || !elements) {
  //     return;
  //   }

  //   setIsProcessingPayment(true);
  //   const response = await fetch('/.netlify/functions/create-payment-intent', {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({amount: amount * 100})
  //   }).then(res => res.json())

  //   const { paymentIntent: {client_secret}} = response
  //   console.log(client_secret)

  //   const paymentResult = await stripe.confirmCardPayment(client_secret, {
  //     payment_method: {
  //       card: elements.getElement(CardElement),
  //       billing_details: {
  //         name: currentUser?currentUser.email:'GUEST'
  //       }
  //     }
  //   })

  //   setIsProcessingPayment(false);
  //   if(paymentResult.error){
  //     alert(paymentResult.error)
  //   } else if(paymentResult.paymentIntent.status === 'succeeded') {
  //     alert('payment successful')
  //     dispatch(clearCart())
  //     console.log(paymentResult.paymentIntent)
  //   }

  //   // const clientSecret = response.paymentIntent.client_secret

  //   console.log(response)
  // }
  return (
    <>
      Payment Process
    </>
    // <PaymentFormContainer>
    //   <FormContainer onSubmit={paymentHandler}>
    //     <h2>Credit Card Payment:</h2>
    //     <CardElement />
    //     <PaymentButton
    //       buttonType={BUTTON_TYPE_CLASSES.inverted}
    //       isLoading={isProcessingPayment}
    //     >
    //       Pay Now
    //     </PaymentButton>
    //   </FormContainer>
    // </PaymentFormContainer>
  )
}

export default PaymentForm;