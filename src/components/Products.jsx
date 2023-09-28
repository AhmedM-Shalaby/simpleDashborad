import React from "react";
import { DeleteData } from "./../models/useDeleteData";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { baseUrl } from "../Api/httpServer";

export default function Products({ item, filterProduct }) {
  const Delete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${item.title}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((data) => {
      console.log(data);
      if (data.isConfirmed) {
        const url = `${baseUrl}/products/${item.id}`;
        DeleteData(url, item.id);
        filterProduct(item.id);
      }
    });
  };

  return (
    <>
      <tr>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td className="table__Img">
          <img
            src={item.thumbnail || "https://placehold.co/100x100"}
            alt={item.title}
          />
        </td>
        <td>{item.category}</td>
        <td>{item.description}</td>
        <td>{item.stock}</td>
        <td>{item.brand}</td>
        <td>{item.price}$</td>
        <td>
          <Link
            to={`addProduct/${item.id}/edit`}
            className="btn btn-warning btn-Action"
          >
            Edit
          </Link>
          <button
            onClick={() => {
              Delete(item);
            }}
            className="btn btn-danger btn-Action"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
