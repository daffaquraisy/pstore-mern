import React, { useState, useEffect } from "react";
import Axios from "axios";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import { addToCart } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

export default function DetailProductPage(props) {
  const { productId } = props.match.params;
  const [Product, setProduct] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        setProduct(response.data[0]);
      })
      .catch((err) => alert(err));
  }, []);

  const addToCartHandler = (productId) => {
    dispatch(addToCart(productId));
  };

  return (
    <div class="container mt-auto">
      <h2 class="text-center mb-3" style={{ fontWeight: "600" }}>
        {Product.title}
      </h2>

      <div class="row d-flex justify-content-center">
        <div class="col-md-6 col-sm-12">
          <ProductImage detail={Product} />
        </div>

        <div class="col-md-6 col-sm-12">
          <h4 style={{ fontWeight: "600" }}>Product Info :</h4>
          <ProductInfo addToCart={addToCartHandler} detail={Product} />
        </div>
      </div>
    </div>
  );
}
