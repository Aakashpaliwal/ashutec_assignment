import laptop from "../assets/img/laptop1.jpg";
import laptop2 from "../assets/img/laptop2.jpg";
import smartwatch1 from "../assets/img/smartwatch1.jpg";
import smartwatch2 from "../assets/img/smartwatch2.jpg";
import television1 from "../assets/img/television1.jpg";
import television2 from "../assets/img/television2.jpg";
import Book1 from "../assets/img/Book1.jpg";
import Book2 from "../assets/img/Book2.jpg";

export const ProductData = [
  {
    id: 1,
    title: "Laptop",
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    image: laptop,
    category: "laptop",
    rating: 3,
    locations: ["Delhi", "Pune"],
    price: 2600,
    inStock: 1,
  },
  {
    id: 2,
    title: "Macbook",
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    image: laptop2,
    category: "laptop",
    rating: 2,
    locations: ["Delhi", "Mumbai"],
    price: 2000,
    inStock: 0,
  },
  {
    id: 3,
    title: "RealMe Watch",
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    image: smartwatch1,
    category: "Smartwatch",
    rating: 4,
    locations: ["Delhi", "Bangalore"],
    price: 1800,
    inStock: 1,
  },
  {
    id: 4,
    title: "Samsung Watch",
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    image: smartwatch2,
    category: "Smartwatch",
    rating: 5,
    locations: ["Delhi"],
    price: 5000,
    inStock: 1,
  },
  {
    id: 5,
    title: "Samsung Television",
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    image: television1,
    category: "Television",
    rating: 1,
    locations: ["Delhi"],
    price: 8000,
    inStock: 0,
  },
  {
    id: 6,
    title: "Apple Television",
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    image: television2,
    category: "Television",
    rating: 3,
    locations: ["Delhi", "Bangalore"],
    price: 2300,
    inStock: 1,
  },
  {
    id: 7,
    title: "Book 1",
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    image: Book1,
    category: "Books",
    rating: 5,
    locations: ["Delhi", "Pune"],
    price: 1500,
    inStock: 0,
  },
  {
    id: 8,
    title: "Book 2",
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    image: Book2,
    category: "Books",
    rating: 4,
    locations: ["Delhi"],
    price: 9000,
    inStock: 0,
  },
];

export const Rating = [1, 2, 3, 4, 5];

export const InStock = ["1", "0"];

export const categories = ["laptop", "Smartwatch", "Television", "Books"];
export const Locations = ["Bangalore", "Delhi", "Mumbai", "Pune"];
