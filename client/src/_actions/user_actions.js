import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM_USER,
  ON_SUCCESS_BUY_USER,
} from "./types";
import { USER_SERVER } from "../components/Config.js";

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function addToCart(_id) {
  const request = axios
    .post(`${USER_SERVER}/addToCart?productId=${_id}`)
    .then((res) => res.data);

  return {
    type: ADD_TO_CART_USER,
    payload: request,
  };
}

export function getCartItems(cartItems, userCart) {
  const request = axios
    .get(`/api/product/products_by_id?id=${cartItems}&type=array`)
    .then((res) => {
      // Make CartDetail inside Redux Store
      // We need to add quantity data to Product Information that come from Product Collection.

      userCart.forEach((cartItem) => {
        res.data.forEach((productDetail, i) => {
          if (cartItem.id === productDetail._id) {
            res.data[i].quantity = cartItem.quantity;
          }
        });
      });
      return res.data;
    });

  return {
    type: GET_CART_ITEMS_USER,
    payload: request,
  };
}

export function removeCartItem(productId) {
  const request = axios
    .get(`/api/users/removeFromCart?_id=${productId}`)
    .then((res) => {
      const { cart, cartDetail } = res.data;

      cart.forEach((item) => {
        cartDetail.forEach((k, i) => {
          if (item.id === k._id) {
            cartDetail[i].quantity = item.quantity;
          }
        });
      });

      return res.data;
    });

  return {
    type: REMOVE_CART_ITEM_USER,
    payload: request,
  };
}

export function onSuccessBuy(data) {
  return {
    type: ON_SUCCESS_BUY_USER,
    payload: data,
  };
}
