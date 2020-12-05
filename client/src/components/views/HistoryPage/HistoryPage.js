import React, { useEffect, useState } from "react";
import Axios from "axios";
import moment from "moment";

export default function HistoryPage() {
  const [History, setHistory] = useState([]);

  useEffect(() => {
    Axios.get("/api/users/getHistory").then((response) => {
      if (response.data.success) {
        setHistory(response.data.history);
      } else {
        alert("Failed to get History");
      }
    });
  }, []);

  return (
    <div class="container">
      <h3 class="text-center">
        <b>History</b>
      </h3>
      <div class="row d-flex justify-content-center">
        <div class="col-md-10">
          <table class="table table-bordered text-center">
            <thead class="thead-light">
              <tr>
                <th scope="col">Payment ID</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Date of Purchase</th>
              </tr>
            </thead>
            <tbody>
              {History.map((item) => (
                <tr key={item.id}>
                  <td>{item.paymentId}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {moment.utc(item.dateOfPurchase).format("DD / MM / YYYY")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
