import React, { Component, Fragment } from "react";
import SimpleReactValidator from "simple-react-validator";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      imgURL: "",
      price: "",
      description: "",
      rating: "",
      isDisabled: true,
      locations: [],
      inStock: 1,
    };
    this.submiHandler = this.submiHandler.bind(this);
    this.validator = new SimpleReactValidator();
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  locationHandler = async (e) => {
    if (e.target.checked) {
      await this.setState({
        locations: [...this.state.locations, e.target.value],
      });
    } else {
      const index = this.state.locations.indexOf(e.target.value);
      this.state.locations.splice(index, 1);
      this.setState({
        locations: this.state.locations,
      });
    }
  };

  submiHandler = (e) => {
    e.preventDefault();
    if (this.validator.allValid()) {
      // alert('You submitted the form and stuff!');
      let value = {
        id: +localStorage.getItem("prdocutID") + 1,
        title: this.state.title,
        Description: this.state.description,
        image: this.state.imgURL,
        category: "Television",
        rating: this.state.rating,
        price: this.state.price,
        locations: this.state.locations,
        inStock: this.state.inStock,
      };
      localStorage.setItem("product", JSON.stringify(value));
      localStorage.setItem("latestprdocutID", value.id);
      this.props.history.push("/products");
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
    // if (this.state.isValidated) {
    //   console.log("validared", this.state);
    // }
    // console.log("e", e.target.Form);
    // console.log(this.state);
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
                            name="imgURL"
                            placeholder="Enter Image URL"
                            onChange={(e) => this.changeHandler(e)}
                          />
                          {/* {this.state.imageURLError ? (
                        <div class="invalid-feedback">
                          Please choose a correct Image URL.
                        </div>
                      ) : null} */}
                          <div class="text-danger">
                            {this.validator.message(
                              "imgurl",
                              this.state.imgURL,
                              "required|regex:https?://.*.(?:png|jpg)"
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputDescription">Description</label>
                        <textarea
                          type="text"
                          class={
                            "form-control " +
                            (this.state.descriptionError ? "is-invalid" : "")
                          }
                          name="description"
                          id="inputDescription"
                          placeholder="Enter Description"
                          onChange={(e) => this.changeHandler(e)}
                        />
                        <div class="text-danger">
                          {this.validator.message(
                            "Description",
                            this.state.description,
                            "required|min:150"
                          )}
                        </div>
                        {/* {this.state.descriptionError ? (
                      <div class="invalid-feedback">
                        Description must be of min 150 characters
                      </div>
                    ) : null} */}
                      </div>
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="inputPrice">Price</label>
                          <input
                            type="text"
                            class="form-control"
                            id="inputPrice"
                            name="price"
                            onChange={(e) => this.changeHandler(e)}
                            placeholder="2500"
                          />
                        </div>
                        <div class="form-group col-md-6">
                          <label for="inputDescription">Rating</label>
                          <br />
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="rating"
                              id="inlineRadio1"
                              value="1"
                              onChange={(e) => this.changeHandler(e)}
                            />
                            <label class="form-check-label" for="inlineRadio1">
                              1
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="rating"
                              id="inlineRadio2"
                              value="2"
                              onChange={(e) => this.changeHandler(e)}
                            />
                            <label class="form-check-label" for="inlineRadio2">
                              2
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="rating"
                              id="inlineRadio3"
                              value="3"
                              onChange={(e) => this.changeHandler(e)}
                            />
                            <label class="form-check-label" for="inlineRadio3">
                              3
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="rating"
                              id="inlineRadio4"
                              value="4"
                              onChange={(e) => this.changeHandler(e)}
                            />
                            <label class="form-check-label" for="inlineRadio4">
                              4
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="rating"
                              id="inlineRadio5"
                              value="5"
                              onChange={(e) => this.changeHandler(e)}
                            />
                            <label class="form-check-label" for="inlineRadio5">
                              5
                            </label>
                          </div>
                        </div>

                        <div className="form-group col-md-6">
                          <label for="inputZip">Available In</label>
                          <br />
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="inlineCheckbox1"
                              value="Bangalore"
                              onChange={(e) => this.locationHandler(e)}
                            />
                            <label
                              class="form-check-label"
                              for="inlineCheckbox1"
                            >
                              Bangalore
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="inlineCheckbox2"
                              value="Delhi"
                              onChange={(e) => this.locationHandler(e)}
                            />
                            <label
                              class="form-check-label"
                              for="inlineCheckbox2"
                            >
                              Delhi
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="inlineCheckbox3"
                              value="Mumbai"
                              onChange={(e) => this.locationHandler(e)}
                            />
                            <label
                              class="form-check-label"
                              for="inlineCheckbox3"
                            >
                              Mumbai
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="inlineCheckbox4"
                              value="Pune"
                              onChange={(e) => this.locationHandler(e)}
                            />
                            <label
                              class="form-check-label"
                              for="inlineCheckbox4"
                            >
                              Pune
                            </label>
                          </div>
                        </div>

                        <div
                          class="form-group col-md-6"
                          style={{ position: "relative", bottom: 6 }}
                        >
                          <label for="inputImageUrl4">In Stock</label>
                          <br />
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inStock"
                              id="inlineRadio6"
                              value="1"
                              defaultChecked={
                                this.state.inStock == 1 ? true : false
                              }
                              onChange={(e) => this.changeHandler(e)}
                            />
                            <label class="form-check-label" for="inlineRadio6">
                              Yes
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inStock"
                              id="inlineRadio7"
                              value="0"
                              defaultChecked={
                                this.state.inStock == 0 ? true : false
                              }
                              onChange={(e) => this.changeHandler(e)}
                            />
                            <label class="form-check-label" for="inlineRadio7">
                              No
                            </label>
                          </div>
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

export default AddProduct;
