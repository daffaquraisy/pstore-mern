import React from "react";

export default function UserCartBlock(props) {
  const { products, removeItem } = props;

  const renderCartImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `http://localhost:5000/${image}`;
    }
  };

  const renderItems =
    products &&
    products.map((product) => (
      <tr key={product._id}>
        <td>
          <img
            src={renderCartImage(product.images)}
            style={{ maxWidth: "75px", maxWidth: "75px" }}
            className="img-fluid"
          />
        </td>
        <td>{product.title}</td>
        <td>${product.price}</td>
        <td>{product.quantity}</td>
        <td>
          <button
            type="danger"
            onClick={() => {
              removeItem(product._id);
            }}
            className="btn btn-danger"
          >
            <i className="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    ));

  return (
    <div>
      <table className="table text-center">
        <thead className="thead-light">
          <tr>
            <th scope="col">Product Image</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Price</th>
            <th scope="col">Product Quantity</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{renderItems}</tbody>
      </table>
    </div>
  );
}
