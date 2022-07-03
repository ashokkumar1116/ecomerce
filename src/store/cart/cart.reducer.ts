import { CART_ACTION_TYPES, CartItem } from './cart.types';
import { CartAction } from './cart.action'

export type CartState = {
  readonly cartItems: CartItem[],
  readonly isCartOpen: boolean
}

export const CART_INITIAL_STATE: CartState = {
  cartItems: [],
  isCartOpen: false
}

export const cartReducer = (state = CART_INITIAL_STATE, action = {} as CartAction) => {

  switch(action.type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, cartItems: action.payload}
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {...state, isCartOpen: action.payload}
    case CART_ACTION_TYPES.SET_CART_CLEAR:
      return {...state, cartItems: []}
    default:
      return state;
  }
}