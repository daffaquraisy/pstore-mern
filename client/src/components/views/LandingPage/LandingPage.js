import React from "react";

export default function LandingPage() {
  return (
    <div>
      <section id="hero" className="hero-section">
        <div className="container justify-content-center">
          <div className="row">
            <div className="col-md-6 col-sm-12 mt-5">
              <h2 className="tag-line">Upcoming Product</h2>
              <h3 className="sub-line">
                Playstation 4, it almost there, wait for it.
              </h3>
            </div>

            <div className="col-md-6 col-sm-12 mt-5">
              <img
                className="img-fluid"
                src="http://localhost:3000/img/banner.png"
                alt="Responsive image"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="content" className="content-section">
        <div className="container">
          <div className="row">
            <div className="col-md-8 p-sm-0">
              <div className="card card-details">
                <h1 className="text-center our-products mt-3">Our Products</h1>

                <div className="row products text-center">
                  <div className="col-md-12 justify-content-center">
                    <button className="btn my-btn btn-sm load-more">
                      Load More
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card card-details">
                <h2 className="text-center mt-2">Search</h2>
                <hr />
                <form>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Search products name..."
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
