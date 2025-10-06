import React from "react";
import Card from "./Card";
import "../index.css";

const products = [
  { id: 1, image: "https://picsum.photos/id/1015/200/150", title: "Product 1", price: 34, rating: 4.2 },
  { id: 2, image: "https://picsum.photos/id/1021/200/150", title: "Product 2", price: 45, rating: 3.8 },
  { id: 3, image: "https://picsum.photos/id/1035/200/150", title: "Product 3", price: 29, rating: 4.5 },
  { id: 4, image: "https://picsum.photos/id/1015/200/150", title: "Product 1", price: 34, rating: 4.2 },
  { id: 5, image: "https://picsum.photos/id/1015/200/150", title: "Product 1", price: 34, rating: 4.2 },
  { id: 6, image: "https://picsum.photos/id/1021/200/150", title: "Product 2", price: 45, rating: 3.8 },
  { id: 7, image: "https://picsum.photos/id/1035/200/150", title: "Product 3", price: 29, rating: 4.5 },
  { id: 8, image: "https://picsum.photos/id/1015/200/150", title: "Product 1", price: 34, rating: 4.2 },
 
];

const CardList = () => {
  return (
    <div className="card-list">
      {products.map(p => <Card key={p.id} product={p} />)}
    </div>
  );
};

export default CardList;
