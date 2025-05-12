import { DeleteData } from "./../models/useDeleteData";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { baseUrl } from "../Api/httpServer";

export default function Products({ item, filterProduct, setPage }) {
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
      if (data.isConfirmed) {
        const url = `${baseUrl}/products/${item.id}`;
        DeleteData(url, item.id);
        filterProduct(item.id);
        setPage(1);
      }
    });
  };

  return (
    <>
      <div className="col-12 col-sm-4 col-md-3 col-lg-3" key={item.id}>
        <div className="card h-100 shadow-sm border-0">
          <img
            src={item?.thumbnail || "https://placehold.co/100x100"}
            className="card-img-top object-fit-cover"
            alt={item.title}
            style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-truncate">{item.title}</h5>
            <p className="card-text small text-muted mb-2 text-truncate">
              {item.description}
            </p>
            <div className="mb-2">
              <span className="badge bg-primary me-1">{item.brand}</span>
              <span className="badge bg-secondary">{item.category}</span>
            </div>
            <h6 className="text-success fw-bold mb-3">${item.price}</h6>
            <div className="d-flex gap-2 mt-3">
              <button
                className="btn btn-sm btn-outline-danger flex-fill"
                onClick={() => Delete(item)}
              >
                Delete
              </button>
              <Link
                to={`addProduct/${item.id}/edit`}
                className="btn btn-sm btn-outline-warning flex-fill"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
