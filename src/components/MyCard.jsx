import React from "react";

export default function MyCard({ data, id }) {
  const { brand, category, description, price, stock, title, thumbnail } = data;

  return (
    <div className="card ">
      <div className="card shadow-sm rounded overflow-hidden">
        <div className="row g-0">
          <div className="col-md-5 d-flex align-items-center justify-content-center bg-light">
            <img
              src={thumbnail || "https://placehold.co/150x150"}
              className="img-fluid rounded-start p-2"
              alt={title}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title mb-1">{title || "Product Title"}</h5>
              <p className="card-text text-muted small mb-2">
                {description || "Product Description"}
              </p>
              <p className="card-text mb-2">
                <strong className="text-success">
                  {price !== undefined && price !== ""
                    ? `${price}$`
                    : "Product Price $"}
                </strong>
              </p>

              <hr className="my-2" />

              <div className="d-flex justify-content-between small text-muted">
                <div>
                  <span className="fw-semibold">Category:</span>{" "}
                  {category || "Product Category"}
                </div>
                <div>
                  <span className="fw-semibold">Brand:</span>{" "}
                  {brand || "Product Brand"}
                </div>
              </div>

              <p className="card-text mt-2 small">
                <span className="fw-semibold">Stock:</span>{" "}
                {stock || "Product Stock"}
              </p>
            </div>
          </div>
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
