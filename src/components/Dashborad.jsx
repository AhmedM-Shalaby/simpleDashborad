import React, { useState } from "react";
import useGetData from "../models/useGetData";
import Loader from "./Loader";
import Error from "./Error";
import { baseUrl } from "../Api/httpServer";
import { Pagination } from "react-bootstrap";
import Products from "./Products";

export default function Dashborad() {
  const [page, setPage] = useState(1);

  const limit = 12;
  const start = page - 1 * limit;

  let url = `${baseUrl}/products?_limit=${limit}&_start=${start}&_page=${page}`;
  const GetLength = "https://simple-dashborad-data.onrender.com/api/products";
  const [data, isLoad, isError, setData] = useGetData(url);
  const [ProductsLength] = useGetData(GetLength);
  const totalPage = Math.ceil(ProductsLength.length / limit);
  console.log(totalPage);

  const numbersPage = Array.from({ length: totalPage }, (_, i) => i + 1);

  const handelPrev = () => {
    if (page === 1) {
      setPage(totalPage);
    } else {
      setPage(page - 1);
    }
  };
  const handelNext = () => {
    if (page === totalPage) {
      setPage(1);
    } else {
      setPage(page + 1);
    }
  };

  // _start=10&_limit=10

  if (isError.Found === true) {
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
    <div className="container py-4">
      <h1 className="mb-4">List of Products</h1>
      <div className="row g-4">
        {data.length > 0 ? (
          data.map((item, index) => (
            <React.Fragment key={index}>
              <Products
                item={item}
                filterProduct={filterProduct}
                setPage={setPage}
              />
            </React.Fragment>
          ))
        ) : (
          <Loader />
        )}
      </div>
      <div className="d-flex justify-content-center align-items-center mt-4">
        <Pagination className="justify-content-center">
          <Pagination.First onClick={() => setPage(1)} />
          <Pagination.Prev onClick={() => handelPrev()}>Prev</Pagination.Prev>

          {numbersPage.map((page, index) => (
            <Pagination.Item key={index} onClick={() => setPage(page)}>
              {page}
            </Pagination.Item>
          ))}

          <Pagination.Next onClick={() => handelNext()}>Next</Pagination.Next>
          <Pagination.Last onClick={() => setPage(totalPage)} />
        </Pagination>
      </div>
    </div>
  );
}
