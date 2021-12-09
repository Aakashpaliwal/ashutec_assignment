import React, { Fragment, useEffect } from "react";
import { useLocation } from "react-router";
import ReactStars from "react-rating-stars-component";

const TrashItem = () => {
  const [products, setProducts] = React.useState([]);
  const [restoreProduct, setRestoreProduct] = React.useState(
    localStorage.getItem("restoreProduct")
      ? JSON.parse(localStorage.getItem("restoreProduct"))
      : []
  );

  const location = useLocation();

  const restoreHandler = (id) => {
    const index = products.findIndex((item) => item.id == id);
    const newRestoreProduct = products.splice(index, 1);
    setRestoreProduct((prevArray) => [...restoreProduct, newRestoreProduct[0]]);
    localStorage.setItem("deleteProducts", JSON.stringify(products));
    let newProducts = [...products];
    setProducts(newProducts);
  };

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("deleteProducts")) &&
      JSON.parse(localStorage.getItem("deleteProducts")).length > 0
    ) {
      setProducts(JSON.parse(localStorage.getItem("deleteProducts")));
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem("restoreProduct", JSON.stringify(restoreProduct));
  }, [restoreProduct]);

  return (
    <Fragment>
      <div className="p-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {!products || (products && products.length == 0) ? (
                <div class="card">
                  <div class="card-body">There is no Item</div>
                </div>
              ) : null}
              <div className="card-deck">
                {products.map((product, index) => (
                  <div className="col-md-4 mb-4" key={index}>
                    <div className="card">
                      <div className="card-img">
                        <img
                          src={product.image}
                          className="card-img-top"
                          alt="laptop"
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text prod_description">
                          {product.Description}
                        </p>
                        <ReactStars
                          count={5}
                          // onChange={ratingChanged}
                          size={24}
                          value={product.rating}
                          activeColor="#ffd700"
                        />
                      </div>
                      <div className="card-footer">
                        <center>
                          <button
                            className="btn btn-info"
                            onClick={() => restoreHandler(product.id)}
                          >
                            Restore
                          </button>
                        </center>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TrashItem;
