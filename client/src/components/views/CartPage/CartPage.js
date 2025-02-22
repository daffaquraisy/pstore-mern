import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy,
} from "../../../_actions/user_actions";
import Axios from "axios";
import Paypal from "../../utils/Paypal";
import UserCartBlock from "./Sections/UserCartBlock";
import Result from "./Sections/Result";
import Empty from "./Sections/Empty";

export default function CartPage(props) {
  const dispatch = useDispatch();
  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    let cartItems = [];

    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        dispatch(getCartItems(cartItems, props.user.userData.cart));
      }
    }
  }, [props.user.userData]);

  useEffect(() => {
    if (props.user.cartDetail && props.user.cartDetail.length > 0) {
      calculateTotal(props.user.cartDetail);
    }
  }, [props.user.cartDetail]);

  const calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
    setShowTotal(true);
  };

  const removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then(() => {
      Axios.get("/api/users/userCartInfo").then((response) => {
        if (response.data.success) {
          if (response.data.cartDetail.length <= 0) {
            setShowTotal(false);
          } else {
            calculateTotal(response.data.cartDetail);
          }
        } else {
          alert("Failed to get cart info");
        }
      });
    });
  };

  const transactionSuccess = (data) => {
    let variables = {
      cartDetail: props.user.cartDetail,
      paymentData: data,
    };

    Axios.post("/api/users/successBuy", variables).then((response) => {
      if (response.data.success) {
        setShowSuccess(true);
        setShowTotal(false);

        dispatch(
          onSuccessBuy({
            cart: response.data.cart,
            cartDetail: response.data.cartDetail,
          })
        );
      } else {
        alert("Failed to buy it");
      }
    });
  };

  const transactionError = () => {
    alert("Paypal Error");
  };

  const transactionCanceled = () => {
    alert("Transaction cancled");
  };

  return (
    <div class="container">
      <h3 class="text-center">
        <b>My Cart</b>
      </h3>
      <div class="row d-flex justify-content-center">
        <div class="col-md-10">
          {ShowTotal ? (
            <div>
              <UserCartBlock
                removeItem={removeFromCart}
                products={props.user.cartDetail}
              />
              <div style={{ marginTop: "3rem" }}>
                <h2>Total amount: ${Total}</h2>
              </div>
            </div>
          ) : ShowSuccess ? (
            <Result />
          ) : (
            <Empty />
          )}
        {ShowTotal && (
          <Paypal
            toPay={Total}
            onSuccess={transactionSuccess}
            transactionError={transactionError}
            transactionCanceled={transactionCanceled}
          />
        )}
        </div>
      </div>
    </div>
  );
}
