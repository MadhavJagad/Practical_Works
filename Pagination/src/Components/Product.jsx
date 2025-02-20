import React, { useContext, useState } from "react";
import { ProductContext } from "../Store/Context";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Product = () => {
  const { products, loading, error } = useContext(ProductContext);
  const [page, setPage] = useState(1);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center my-3">PRODUCTS</h1>
        {loading ? (
          <div className="text-center">
            <Loader />
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="container d-flex flex-wrap gap-3">
            {products.slice(page * 10 - 10, page * 10).map((item) => {
              return (
                <div
                  className="card"
                  style={{ width: "18rem" }}
                  key={item.id}
                >
                  <img
                    src={item.images}
                    className="card-img-top"
                    alt={item.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <Link
                      to={"/display"}
                      className="btn btn-primary"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {products.length > 0 && (
        <div className="container d-flex justify-content-center align-content-center mt-3">
          <nav ariaLabel="...">
            <ul className="pagination">
              <li className="page-item">
                <a
                  className={`page-link ${page > 1 ? "" : "disabled"}`}
                  role="button"
                  onClick={() => selectPageHandler(page - 1)}
                >
                  Previous
                </a>
              </li>
              {[...Array(products.length / 10)].map((_, i) => {
                return (
                  <li
                    className={`page-item  ${page === i + 1 ? "active" : ""}`}
                    key={i}
                  >
                    <a
                      role="button"
                      className="page-link"
                      onClick={() => selectPageHandler(i + 1)}
                    >
                      {i + 1}
                    </a>
                  </li>
                );
              })}
              <li className="page-item">
                <a
                  className={`page-link ${
                    page < products.length / 10 ? "" : "disabled"
                  }`}
                  role="button"
                  onClick={() => selectPageHandler(page + 1)}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Product;
