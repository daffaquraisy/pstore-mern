import React from "react";

export default function Empty() {
  return (
    <div className="container mt-auto">
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 p-sm-0 text-center">
          <img
            src="http://localhost:3000/img/empty.png"
            style={{ width: "100%", height: "500px" }}
            className="img-fluid"
            alt="success"
          />

          <h3 style={{ fontWeight: 600, color: "#0a0031" }}>Empty!</h3>
          <p style={{ color: "#a1a1a1" }}>
            You don't have any items in your cart !
          </p>
        </div>
      </div>
    </div>
  );
}
