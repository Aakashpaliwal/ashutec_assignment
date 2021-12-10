import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import StarRatings from "react-star-ratings";
import { AiOutlineLeft } from "react-icons/ai";

const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState(
    JSON.parse(localStorage.getItem("detailProduct"))
  );
  const [backgroundImage, setBackgroundImage] = useState("");
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
  const [rating, setRating] = useState(0);

  const history = useHistory();
  const location = useLocation();

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  useEffect(() => {
    setProductDetail(JSON.parse(localStorage.getItem("detailProduct")));
  }, [location]);

  useEffect(() => {
    setBackgroundImage(`url(${productDetail.image})`);
    setRating(+productDetail.rating);
  }, [productDetail]);

  return (
    <Fragment>
      <div className="product_detail_container pt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <span
                onClick={() => history.push("/products")}
                style={{ cursor: "pointer" }}
              >
                <AiOutlineLeft />
              </span>
              <hr />
              <div class="card-deck pt-4">
                <div class="card detail_card">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="img-wrapper">
                        <figure
                          onMouseMove={handleMouseMove}
                          style={{
                            backgroundImage: backgroundImage,
                            backgroundPosition: backgroundPosition,
                          }}
                        >
                          <img
                            src={productDetail.image}
                            class="card-img-top"
                            alt="Card image cap"
                          />
                        </figure>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="card-body">
                        <h5 class="card-title">{productDetail.title}</h5>
                        <p className="card-text">
                          &#8377; {productDetail.price}
                        </p>
                        <p class="card-text">{productDetail.description}</p>
                        <p
                          className={
                            productDetail.inStock == 1
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {productDetail.inStock == 1
                            ? "In Stock"
                            : "Out of Stock"}
                        </p>
                        <StarRatings
                          rating={rating}
                          starRatedColor="#ffd700"
                          numberOfStars={5}
                          starDimension="20px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </Fragment>
  );
};

export default ProductDetail;
