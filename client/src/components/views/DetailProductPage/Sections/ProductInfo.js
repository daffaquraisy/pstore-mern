import React, { useEffect, useState } from "react";

export default function ProductInfo(props) {
  const [Product, setProduct] = useState({});

  useEffect(() => {
    setProduct(props.detail);
  }, [props.detail]);

  const AddToCarthandler = () => {
    props.addToCart(props.detail._id);
  };

  return (
    <div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">
              <b>Price: ${Product.price}</b>
            </th>
            <th scope="col">
              <b>Sold: {Product.sold}</b>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">
              <b>Description: </b>
              <br />
              {Product.description}
            </td>
          </tr>
        </tbody>
      </table>

      <button className="btn my-btn" onClick={AddToCarthandler}>
        Add To Cart
      </button>
    </div>
  );
}
