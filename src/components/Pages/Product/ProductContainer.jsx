import React, { Component, Fragment } from "react";
import ProductList from "./ProductList";
import {
  categories,
  Locations,
  ProductData,
  Rating,
} from "../../Data/ProductData";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { BsFilter, BsGear } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

export class ProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: ProductData,
      isOpen: false,
      productID: 0,
      productName: "",
      deleteProducts: localStorage.getItem("deleteProducts")
        ? JSON.parse(localStorage.getItem("deleteProducts"))
        : [],
      filterShow: false,
      filterTerm: "",
    };
    this.deleteHandler = this.deleteHandler.bind(this);
    this.categoryFilter = this.categoryFilter.bind(this);
    this.filterShownHandler = this.filterShownHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
  }

  componentDidMount() {
    localStorage.setItem("allProducts", JSON.stringify(this.state.product));
    localStorage.setItem(
      "prdocutID",
      localStorage.getItem("latestprdocutID") > 8
        ? localStorage.getItem("latestprdocutID")
        : 8
    );
    let productArr = JSON.parse(localStorage.getItem("product"));
    if (
      localStorage.getItem("deleteProducts") &&
      JSON.parse(localStorage.getItem("deleteProducts").includes(productArr))
    ) {
      let index = this.state.product.findIndex(
        (item) => item.id == productArr.id
      );
      this.state.product.splice(index, 1);
      let newProducrArr = [...this.state.product];
      this.setState({
        product: newProducrArr,
      });
    } else {
      if (productArr) {
        const i = this.state.product.findIndex(
          (_element) => _element.id == productArr.id
        );
        if (i > -1) {
          this.state.product[i] = productArr;
        } else {
          this.state.product.push(productArr);
        }
        localStorage.setItem("prdocutID", this.state.product.length);
      }
    }
    this.forceUpdate();

    let restoreProductArr = JSON.parse(localStorage.getItem("restoreProduct"));
    if (restoreProductArr) {
      const results = restoreProductArr.filter(
        ({ id: id1 }) => !this.state.product.some(({ id: id2 }) => id2 === id1)
      );
      let newProductArr = [...this.state.product, ...results];
      this.setState({
        product: newProductArr,
      });
      localStorage.removeItem("restoreProduct");
    }
  }

  openModal = (id, title) => {
    this.setState({
      isOpen: true,
      productID: id,
      productName: title,
    });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
    });
  };

  deleteHandler = () => {
    const { productID: id } = this.state;
    console.clear();
    let index = this.state.product.findIndex((item) => item.id === id);
    // this.setState({
    //   deleteProducts: localStorage.getItem("deleteProducts")
    //     ? JSON.parse(localStorage.getItem("deleteProducts"))
    //     : [],
    // });
    this.state.deleteProducts.push(this.state.product[index]);
    localStorage.setItem(
      "deleteProducts",
      JSON.stringify(this.state.deleteProducts)
    );
    this.state.product.splice(index, 1);
    this.closeModal();
    this.forceUpdate();
  };

  editHandler = (id) => {
    let index = this.state.product.findIndex((item) => item.id === id);
    localStorage.setItem(
      "editProductDetail",
      JSON.stringify(this.state.product[index])
    );
    this.props.history.push("/EditProduct");
  };

  filterShownHandler = () => {
    this.setState({
      filterShow: !this.state.filterShow,
    });
  };

  resetHandler = () => {
    this.setState({
      filterShow: false,
      product: JSON.parse(localStorage.getItem("allProducts")),
    });
  };

  searchHandler = (e) => {
    if (e.target.value == "" || e.target.value == null) {
      this.setState({
        product: JSON.parse(localStorage.getItem("allProducts")),
      });
    } else {
      let updatedList = this.state.product;
      updatedList = updatedList.filter(function (item) {
        return (
          item.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1
        );
      });
      this.setState({
        product: updatedList,
      });
    }
  };

  categoryFilter = (e) => {
    let value = e.target.value;
    let filterProduct = this.state.product.filter(
      (item) => item.category == value
    );
    this.setState({
      product: filterProduct,
    });
  };

  ratingFilter = (e) => {
    let value = e.target.value;
    let filterProduct = this.state.product.filter(
      (item) => item.rating == value
    );
    this.setState({
      product: filterProduct,
    });
  };

  locationFilter = (e) => {
    let value = e.target.value;
    let filterProduct = this.state.product.filter((item) =>
      item.locations.includes(value)
    );
    this.setState({
      product: filterProduct,
    });
  };

  priceFilter = (e) => {
    let value = e.target.value;
    if (value === "low_to_high") {
      let filteredProduct = this.state.product.sort(
        (a, b) => a.price - b.price
      );
      this.setState({
        product: filteredProduct,
      });
    }
    if (value == "high_to_low") {
      let filteredProduct = this.state.product.sort(
        (a, b) => b.price - a.price
      );
      this.setState({
        product: filteredProduct,
      });
    }
  };

  render() {
    const { product } = this.state;
    return (
      <Fragment>
        <div className="p-4">
          <div className="container">
            <div className="row">
              <hr />
              <div className="col-12">
                <div className="filter">
                  <button
                    className="btn btn-primary"
                    onClick={() => this.filterShownHandler()}
                  >
                    <span className="filter_icon">
                      <BsFilter />
                    </span>{" "}
                    Filter
                  </button>
                  {!this.state.filterShow && (
                    <span style={{ float: "right" }}>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1">
                            <AiOutlineSearch />
                          </span>
                        </div>
                        <input
                          type="search"
                          className="form-control"
                          placeholder="Enter Product Name (e.g. Macbook)"
                          onChange={(e) => this.searchHandler(e)}
                          style={{ width: 350 }}
                        />
                      </div>
                    </span>
                  )}
                  {this.state.filterShow && (
                    <button
                      className="btn btn-info float_right"
                      onClick={() => this.resetHandler()}
                    >
                      <span className="filter_icon">
                        <BsGear />
                      </span>{" "}
                      Reset
                    </button>
                  )}

                  {this.state.filterShow && (
                    <Fragment>
                      <hr />
                      <div className="form-row">
                        <div class="form-group col-md-3">
                          <label for="inputState">Categories</label>
                          <select
                            id="inputState"
                            class="form-control"
                            onChange={(e) => this.categoryFilter(e)}
                          >
                            <option selected>Choose...</option>
                            {categories.map((item, index) => {
                              return (
                                <option value={item} key={index}>
                                  {item}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <div class="form-group col-md-3">
                          <label for="inputState">Rating</label>
                          <select
                            id="inputState"
                            class="form-control"
                            onChange={(e) => this.ratingFilter(e)}
                          >
                            <option selected>Choose...</option>
                            {Rating.map((item, index) => {
                              return (
                                <option value={item} key={index}>
                                  {item}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <div class="form-group col-md-3">
                          <label for="inputState">Location</label>
                          <select
                            id="inputState"
                            class="form-control"
                            onChange={(e) => this.locationFilter(e)}
                          >
                            <option selected>Choose...</option>
                            {Locations.map((item, index) => {
                              return (
                                <option value={item} key={index}>
                                  {item}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <div class="form-group col-md-3">
                          <label for="inputState">Price</label>
                          <select
                            id="inputState"
                            class="form-control"
                            onChange={(e) => this.priceFilter(e)}
                          >
                            <option selected>Choose...</option>
                            <option value={"low_to_high"}>
                              {"Low to High"}
                            </option>
                            <option value={"high_to_low"}>
                              {"High to Low"}
                            </option>
                          </select>
                        </div>
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <hr />
                <div className="card-deck">
                  {product &&
                    product.map((item, index) => {
                      return (
                        <ProductList
                          key={index}
                          id={item.id}
                          title={item.title}
                          description={item.Description}
                          // price={item.price}
                          image={item.image}
                          rating={item.rating}
                          deleteHandler={this.deleteHandler}
                          editHandler={this.editHandler}
                          price={item.price}
                          inStock={item.inStock}
                          isOpen={this.state.isOpen}
                          openModal={this.openModal}
                          closeModal={this.closeModal}
                          // rating={item.rating}
                          // numReviews={item.numReviews}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          <Modal open={this.state.isOpen} onClose={this.closeModal} center>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Delete Product
              </h5>
            </div>
            <div class="modal-body">{`Are you sure you want to delete ${this.state.productName} item?`}</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                onClick={this.closeModal}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={this.deleteHandler}
              >
                Ok
              </button>
            </div>
          </Modal>
          <div className="icon_container">
            <Link to="/AddProduct">
              <span className="my_float_icon">
                <FaPlus className="icon" />
              </span>
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ProductContainer;
