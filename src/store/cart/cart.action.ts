import { createAction, ActionWithPayload, Action } from '../../utils/reducer/reducer.utils';
import { CategoryItem } from "../categories/categories.types";
import { CART_ACTION_TYPES, CartItem } from './cart.types';

export type SetCartIsOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export type ClearCart = Action<CART_ACTION_TYPES.SET_CART_CLEAR>

export type CartAction = 
| SetCartIsOpen
| SetCartItems
| ClearCart

export const setIsCartOpen = (boolean: boolean): SetCartIsOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem): SetCartItems => {
  const newCartItems = addCartItem(cartItems, productToAdd)
  return  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem): SetCartItems => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove)
  return  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem): SetCartItems => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear)
  return  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const clearCart = (): ClearCart => createAction(CART_ACTION_TYPES.SET_CART_CLEAR)


const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {

  const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id)

  if(existingCartItem){
    return cartItems.map(cartItem => 
      cartItem.id === productToAdd.id
        ? {...cartItem, quantity:cartItem.quantity + 1}
        : cartItem
    )
  }

  return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem ): CartItem[] => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id)

  if(existingCartItem && existingCartItem.quantity === 1){
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }

  return cartItems.map(cartItem => 
    cartItem.id === cartItemToRemove.id
      ? {...cartItem, quantity:cartItem.quantity - 1}
      : cartItem
  )
}

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)