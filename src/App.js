import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import Reports from "./components/Pages/Reports";
import ProductContainer from "./components/Pages/Product/ProductContainer";
import AddProduct from "./components/Pages/Product/AddProduct";
import EditProduct from "./components/Pages/Product/EditProduct";
import TrashItem from "./components/Pages/Trash/TrashItem";
import ProductDetail from "./components/Pages/Product/ProductDetail";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={ProductContainer} />
          {/* <Route path="/reports" component={Reports} /> */}
          <Route path="/products" component={ProductContainer} />
          <Route path="/AddProduct" exact component={AddProduct} />
          <Route path="/EditProduct" exact component={EditProduct} />
          <Route path="/trash" exact component={TrashItem} />
          <Route path="/productDetail" exact component={ProductDetail} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
