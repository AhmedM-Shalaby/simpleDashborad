import React, { useState } from "react";
import useGetData from "../models/useGetData";
import Loader from "./Loader";
import Error from "./Error";
import { Link } from "react-router-dom";
import Products from "./Products";
import { baseUrl } from "../Api/httpServer";

export default function Dashborad() {
  let url = `${baseUrl}/products`;
  const [data, isLoad, isError, setData] = useGetData(url);
  const [searchQuery, setSearchQuery] = useState("");
  if (isError.Found === true) {
    console.log(isError);
    return <Error Errors={isError} />;
  }
  if (isLoad) {
    return (
      <>
        <Loader />
      </>
    );
  }
  const filterProduct = (id) => setData(data.filter((item) => item.id !== id));
  return (
    <div className="container-fluid ">
      <div className="row my-4">
        <div className="col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-lg-6">
          <Link to="/addProduct" className="btn btn-outline-info">
            Add Product
          </Link>
        </div>
      </div>
      <div className="scroll">
        <table className="table table-bordered">
          <thead>
            <tr>
              <td>Id</td>
              <td>Title</td>
              <td>Images</td>
              <td>Category</td>
              <td>Description</td>
              <td>Stock</td>
              <td>Brand</td>
              <td>Price</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {/* {console.log(data)} */}
            {data.length >= 0 ? (
              data
                .filter((item) => {
                  return searchQuery.toLocaleLowerCase() === ""
                    ? item
                    : item.title.toLowerCase().includes(searchQuery) ||
                        item.description.toLowerCase().includes(searchQuery) ||
                        item.brand.toLowerCase().includes(searchQuery) ||
                        item.category.toLowerCase().includes(searchQuery);
                })
                .map((item) => {
                  return (
                    <Products
                      key={item.id}
                      item={item}
                      filterProduct={filterProduct}
                    />
                  );
                })
            ) : (
              <Loader />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// setData()
