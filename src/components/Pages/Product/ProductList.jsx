import React, { Fragment, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import StarRatings from "react-star-ratings";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useHistory } from "react-router";
import { numberFormat } from "../../Utility";

const ProductList = (props) => {
  const history = useHistory();

  const detailRouteHandler = (id) => {
    let value = {
      id: props.id,
      description: props.description,
      image: props.image,
      price: props.price,
      rating: props.rating,
      title: props.title,
      inStock: props.inStock,
    };
    localStorage.setItem("detailProduct", JSON.stringify(value));
    history.push("/productDetail");
  };

  return (
    <Fragment>
      <div className="col-md-4 mb-4">
        <div className="card detail_card">
          <div className="card-img">
            <img src={props.image} className="card-img-top" alt="laptop" />
          </div>
          <div className="card-body">
            <h4
              className="card-title"
              onClick={() => detailRouteHandler(props.id)}
            >
              {props.title}
            </h4>
            <p className="card-text prod_description">{props.description}</p>
            {/* <StarRatings
              rating={props.rating}
              starRatedColor="#ffd700"
              numberOfStars={5}
              starDimension="20px"
            /> */}
            <p className="card-text">
              {" "}
              &#8377; {numberFormat(props.price)}{" "}
              <span
                className={props.inStock == 1 ? "text-success" : "text-danger"}
                style={{ float: "right" }}
              >
                {props.inStock == 1 ? "In Stock" : "Out of Stock"}
              </span>
            </p>
          </div>
          <div className="card-footer">
            <span
              onClick={() => {
                props.openModal(props.id, props.title);
              }}
              style={{
                cursor: "pointer",
                fontSize: "1.2rem",
                color: "#c82333",
              }}
            >
              <AiOutlineDelete />
            </span>
            <span
              onClick={() => props.editHandler(props.id)}
              style={{
                float: "right",
                cursor: "pointer",
                fontSize: "1.2rem",
                color: "#17a2b8",
              }}
            >
              <AiOutlineEdit />
            </span>
          </div>
        </div>
      </div>
      <div></div>
    </Fragment>
  );
};

export default ProductList;
