import React, { useState, useEffect } from "react";
import Axios from "axios";
import SearchFeature from "./Sections/SearchFeature";

export default function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(3);
  const [PostSize, setPostSize] = useState(0);
  const [SearchTerms, setSearchTerms] = useState("");

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(variables);
  }, []);

  const getProducts = (variables) => {
    Axios.post("/api/product/getProducts", variables).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setProducts([...Products, ...response.data.products]);
        } else {
          setProducts(response.data.products);
        }

        setPostSize(response.data.postSize);

        console.log(response.data.products);
      } else {
        alert("Failed to get products");
      }
    });
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;

    const variables = {
      loadMore: true,
      skip: skip,
      limit: Limit,
    };

    getProducts(variables);
    setSkip(skip);
  };

  const updateSearchTerms = (newSearchTerm) => {
    const variables = {
      skip: 0,
      limit: Limit,
      searchTerm: newSearchTerm,
    };

    setSkip(0);

    setSearchTerms(newSearchTerm);
    getProducts(variables);
  };

  const renderProducts = Products.map((product, index) => {
    return (
      <div className="col-md-4 mb-1 mt-3">
        <img
          src={`http://localhost:5000/${product.images}`}
          className="img-fluid"
          style={{ maxHeight: "200px", maxWidth: "200px" }}
        />
        <h4 className="product-name">{product.title}</h4>
        <p style={{ fontSize: "14px" }}>${product.price}</p>
        <a
          href={`/product/${product._id}`}
          className="btn my-btn btn-sm buy-now"
        >
          Detail
        </a>
      </div>
    );
  });

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

                {Products.length === 0 ? (
                  <p className="text-center">There is no data </p>
                ) : (
                  <div className="row products text-center">
                    {renderProducts}
                    <div className="col-md-12 justify-content-center">
                      {PostSize >= Limit && (
                        <button
                          onClick={onLoadMore}
                          className="btn my-btn btn-sm load-more"
                        >
                          Load More
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className="card card-details">
                <h2 className="text-center mt-2">Search</h2>
                <hr />
                <SearchFeature refreshFunction={updateSearchTerms} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
