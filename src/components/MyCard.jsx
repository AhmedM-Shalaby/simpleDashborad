import React from "react";

export default function MyCard({ data, id }) {
  const { brand, category, description, price, stock, title, thumbnail } = data;

  return (
    <div className="card ">
      <img
        src={thumbnail || "https://placehold.co/100x100"}
        className="CardImg"
        alt={title}
      />
      <div className="card-body row">
        <div className="col-6">
          <h2 className="card-title">{title || "Product Title"}</h2>
          <p className="card-text">{description || "Product Description"}</p>
          <p className="card-text">
            <strong>
              {price !== undefined ? price + "$" : "Product Price $"}
            </strong>
          </p>
        </div>
        <div className="col-6">
          <h5 className="card-title">{category || "Product Category"}</h5>
          <span>{brand || "Product Brand"}</span>
          <p className="card-text">{stock || "Product Stock"}</p>
        </div>
      </div>
      <button
        type="submit"
        className={`btn m-3 ${id ? "btn-warning" : "btn-success"}`}
      >
        {id ? "Edit Product" : "Add Product"}
      </button>
    </div>
  );
}
