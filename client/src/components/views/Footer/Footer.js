// eslint-disable-next-line
import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="section-footer mt-5 mb-5 border-top">
        <div className="container pt-5 pb-5">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="row">
                <div className="col-12 col-lg-3">
                  <h5>FEATURES</h5>
                  <ul className="list-unstyled">
                    <li>
                      <a href="/">Reviews</a>
                    </li>
                    <li>
                      <a href="/">Community</a>
                    </li>
                    <li>
                      <a href="/">Social Media Kit</a>
                    </li>
                    <li>
                      <a href="/">Affiliate</a>
                    </li>
                  </ul>
                </div>

                <div className="col-12 col-lg-3">
                  <h5>ACCOUNT</h5>
                  <ul className="list-unstyled">
                    <li>
                      <a href="/">Refund</a>
                    </li>
                    <li>
                      <a href="/">Security</a>
                    </li>
                    <li>
                      <a href="/">Rewards</a>
                    </li>
                  </ul>
                </div>

                <div className="col-12 col-lg-3">
                  <h5>COMPANY</h5>
                  <ul className="list-unstyled">
                    <li>
                      <a href="/">Career</a>
                    </li>
                    <li>
                      <a href="/">Help Center</a>
                    </li>
                    <li>
                      <a href="/">Media</a>
                    </li>
                  </ul>
                </div>

                <div className="col-12 col-lg-3">
                  <h5>GET CONNECTED</h5>
                  <ul className="list-unstyled">
                    <li>
                      <a href="/">Bogor Selatan</a>
                    </li>
                    <li>
                      <a href="/">Indonesia</a>
                    </li>
                    <li>
                      <a href="/">0821 - 2433 - 8888</a>
                    </li>
                    <li>
                      <a href="/">support@ps_store.id</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row border-top justify-content-center align-items-center pt-4">
            <div className="col-auto text-gray-500 font-weight-light">
              2020 Copyright Ps Store • All rights reserved • Made in Bogor
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
