import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import SimpleReactValidator from "simple-react-validator";
import { InStock, Rating } from "../../Data/ProductData";

export class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newLocation: [],
      locations: ["Bangalore", "Delhi", "Mumbai", "Pune"],
      data: JSON.parse(localStorage.getItem("editProductDetail")),
      prevLocation: JSON.parse(localStorage.getItem("editProductDetail"))
        .locations
        ? JSON.parse(localStorage.getItem("editProductDetail")).locations
        : [],
      title: JSON.parse(localStorage.getItem("editProductDetail")).title,
      Description: JSON.parse(localStorage.getItem("editProductDetail"))
        .Description,
      image: JSON.parse(localStorage.getItem("editProductDetail")).image,
    };
    this.submiHandler = this.submiHandler.bind(this);
    this.validator = new SimpleReactValidator();
    this.ratingHandler = this.ratingHandler.bind(this);
  }

  changeHandler = (e) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      [e.target.name]: e.target.value,
    });
  };

  ratingHandler = (e) => {};

  locationHandler = async (e) => {
    if (e.target.checked) {
      await this.setState({
        prevLocation: [...this.state.prevLocation, e.target.value],
      });
    } else {
      const index = this.state.prevLocation.indexOf(e.target.value);
      this.state.prevLocation.splice(index, 1);
      this.setState({
        prevLocation: this.state.prevLocation,
      });
    }
  };

  submiHandler = (e) => {
    e.preventDefault();
    if (this.validator.allValid()) {
      let value = { ...this.state.data, locations: this.state.prevLocation };
      localStorage.setItem("product", JSON.stringify(value));
      localStorage.removeItem("editProductDetail");
      this.props.history.push("/products");
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
    // let value = { ...this.state.data, locations: this.state.prevLocation };
    // console.log("value", value);
    // localStorage.setItem("product", JSON.stringify(value));
    // localStorage.removeItem("editProductDetail");
    // this.props.history.push("/products");
  };
  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div class="card mt-4 detail_card">
                <div class="card-body">
                  <div className="form_container pt-4">
                    <form onSubmit={this.submiHandler}>
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="inputText4">Title</label>
                          <input
                            type="text"
                            class={
                              "form-control " +
                              (this.state.titleError ? "is-invalid" : "")
                            }
                            id="inputText4"
                            name="title"
                            defaultValue={
                              JSON.parse(
                                localStorage.getItem("editProductDetail")
                              ).title
                            }
                            onChange={(e) => this.changeHandler(e)}
                            placeholder="Enter Title"
                          />
                          <div class="text-danger">
                            {this.validator.message(
                              "title",
                              this.state.title,
                              "required|max:50"
                            )}
                          </div>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="inputImageUrl4">Image URL</label>
                          <input
                            type="text"
                            class={
                              "form-control " +
                              (this.state.imageURLError ? "is-invalid" : "")
                            }
                            id="inputImageUrl4"
                            name="image"
                            defaultValue={
                              JSON.parse(
                                localStorage.getItem("editProductDetail")
                              ).image
                            }
                            placeholder="Enter Image URL"
                            onChange={(e) => this.changeHandler(e)}
                          />
                          <div class="text-danger">
                            {this.validator.message(
                              "imageUrl",
                              this.state.image,
                              "required|regex:https?://.*.(?:png|jpg)"
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputDescription">Description</label>
                        <textarea
                          type="text"
                          class={"form-control"}
                          name="Description"
                          id="inputDescription"
                          placeholder="Enter Description"
                          defaultValue={
                            JSON.parse(
                              localStorage.getItem("editProductDetail")
                            ).Description
                          }
                          onChange={(e) => this.changeHandler(e)}
                        />
                        <div class="text-danger">
                          {this.validator.message(
                            "Description",
                            this.state.Description,
                            "required|min:150"
                          )}
                        </div>
                      </div>
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="inputPrice">Price</label>
                          <input
                            type="text"
                            class="form-control"
                            id="inputPrice"
                            name="price"
                            defaultValue={
                              JSON.parse(
                                localStorage.getItem("editProductDetail")
                              ).price
                            }
                            placeholder="2500"
                            onChange={(e) => this.changeHandler(e)}
                          />
                        </div>
                        <div class="form-group col-md-6">
                          <label for="inputDescription">Rating</label>
                          <br />
                          {Rating.map((item, index) => {
                            return (
                              <div
                                class="form-check form-check-inline"
                                key={index}
                              >
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="rating"
                                  defaultChecked={
                                    JSON.parse(
                                      localStorage.getItem("editProductDetail")
                                    ).rating == item
                                      ? true
                                      : false
                                  }
                                  id="inlineRadio1"
                                  value={item}
                                  onChange={(e) => this.changeHandler(e)}
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineRadio1"
                                >
                                  {item}
                                </label>
                              </div>
                            );
                          })}
                        </div>

                        <div className="form-group col-md-6">
                          <label for="inputZip">Available In</label>
                          <br />
                          {this.state.locations.map((item, index) => {
                            return (
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  name="locations"
                                  id={"inlineCheckbox" + index}
                                  defaultChecked={
                                    this.state.prevLocation &&
                                    this.state.prevLocation.includes(item)
                                      ? true
                                      : false
                                  }
                                  value={item}
                                  onChange={(e) => this.locationHandler(e)}
                                />
                                <label
                                  class="form-check-label"
                                  for={"inlineCheckbox" + index}
                                >
                                  {item}
                                </label>
                              </div>
                            );
                          })}
                        </div>

                        <div
                          class="form-group col-md-6"
                          style={{ position: "relative", bottom: 6 }}
                        >
                          <label for="inputImageUrl4">In Stock</label>
                          <br />
                          {InStock.map((item, index) => {
                            return (
                              <div
                                class="form-check form-check-inline"
                                key={index}
                              >
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="inStock"
                                  id="inlineRadio6"
                                  value={item}
                                  defaultChecked={
                                    JSON.parse(
                                      localStorage.getItem("editProductDetail")
                                    ).inStock == item
                                      ? true
                                      : false
                                  }
                                  onChange={(e) => this.changeHandler(e)}
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineRadio6"
                                >
                                  {item == 1 ? "Yes" : "No"}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <button
                        type="submit"
                        class="btn btn-primary"
                        // disabled={this.state.isDisabled}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EditProduct;
