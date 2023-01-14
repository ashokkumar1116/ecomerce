import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  'sk_test_51MQ39TLg1bKM78qbgZG7USiSzitKnDmr3IESfOeY2qjhxOoMaTWvsqxfK7nBv0DO3DwG1kyFnPPaAlIVdguiX9Mg006epzeM5I'
);