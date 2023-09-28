import React, { useEffect } from "react";
import { useState } from "react";
import MyCard from "./MyCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "./../models/useGetProduct";
import { PostData } from "../models/usePostData";
import { editData } from "../models/useEdit";
import { baseUrl } from "../Api/httpServer";

export default function Addproduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const url = `${baseUrl}/products`;
  const [dataForm, setDataForm] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    brand: "",
    category: "",
  });
  const operationImg = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (e) => {};
  };
  const operationHandler = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandeler = (e) => {
    e.preventDefault();
    setDataForm({
      title: "",
      description: "",
      price: 0,
      stock: 0,
      brand: "",
      category: "",
    });
    if (id === undefined) {
      console.log("add");
      PostData(url, dataForm);
    } else {
      console.log("edit");
      editData(`${url}/${id}`, dataForm);
    }
    navigate("/");
  };
  useEffect(() => {
    if (id !== undefined) {
      const fetchData = async () => {
        const response = await getProductById(`${url}/${id}`);
        setDataForm(response.data);
      };
      fetchData();
    }
  }, [id]);

  return (
    <div className="container mt-4">
      <h1>Add Product</h1>
      <div>
        <form onSubmit={submitHandeler}>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="productTitle">
                Product Title
                <input
                  type="text"
                  onChange={operationHandler}
                  name="title"
                  id="productTitle"
                  className="form-control"
                  placeholder="Title"
                  value={dataForm.title}
                />
              </label>
            </div>
            <div className="col-lg-6">
              <label htmlFor="productDescription">
                Product Description
                <input
                  type="text"
                  onChange={operationHandler}
                  name="description"
                  id="productDescription"
                  className="form-control"
                  placeholder=" Description"
                  value={dataForm.description}
                />
              </label>
            </div>
            <div className="col-lg-6">
              <label htmlFor="productPrice">
                Product Price
                <input
                  type="number"
                  onChange={operationHandler}
                  name="price"
                  id="productP"
                  className="form-control"
                  placeholder=" Price"
                  value={dataForm.price}
                />
              </label>
            </div>
            <div className="col-lg-6">
              <label htmlFor="productStock">
                Product Stock
                <input
                  type="number"
                  onChange={operationHandler}
                  name="stock"
                  id="productStock"
                  className="form-control"
                  placeholder=" Stock"
                  value={dataForm.stock}
                />
              </label>
            </div>
            <div className="col-lg-6">
              <label htmlFor="productBrand">
                Product Brand
                <input
                  type="text"
                  onChange={operationHandler}
                  name="brand"
                  id="productStock"
                  className="form-control"
                  placeholder=" Brand"
                  value={dataForm.brand}
                />
              </label>
            </div>
            <div className="col-lg-6">
              <label htmlFor="productCategory">
                Product Category
                <input
                  type="text"
                  onChange={operationHandler}
                  name="category"
                  id="productCategory"
                  className="form-control"
                  placeholder=" Category"
                  value={dataForm.category}
                />
              </label>
            </div>
            <div className="col-lg-6">
              <p className="mt-3 fs-5"> Upload Image</p>
              <label htmlFor="productImage" className="labelImge">
                <input
                  type="file"
                  onChange={operationImg}
                  name="thumbnail"
                  id="productImage"
                  className=" inputImg"
                  placeholder=" Image"
                />
              </label>
              <Link to="/" className="btn btn-outline-secondary mt-3">
                Back To Dashborad
              </Link>
            </div>
            <div className="col-lg-6 mt-5">
              <MyCard data={dataForm} id={id} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
