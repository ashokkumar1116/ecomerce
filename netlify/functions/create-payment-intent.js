const { async } = require('@firebase/util');

require('dotenv').config()
const stripe = require('stripe')('sk_test_51MQ39TLg1bKM78qbgZG7USiSzitKnDmr3IESfOeY2qjhxOoMaTWvsqxfK7nBv0DO3DwG1kyFnPPaAlIVdguiX9Mg006epzeM5I');

exports.handler = async (event) =>{ 
  try {
    const { amount } = JSON.parse(event.body)

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"]
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent })
    }
  } catch(error) {
    console.log(error);

    return {
      statusCode: 400 ,
      body: JSON.stringify({ error })
    }
  }
}