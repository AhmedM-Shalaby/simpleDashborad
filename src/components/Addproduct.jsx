import { useEffect } from "react";
import MyCard from "./MyCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "./../models/useGetProduct";
import { PostData } from "../models/usePostData";
import { editData } from "../models/useEdit";
import { baseUrl } from "../Api/httpServer";
import { useFormik } from "formik";
import { inputs, schemaAddProduct } from "../models/schemaAddProduct";

export default function Addproduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const url = `${baseUrl}/products`;

  useEffect(() => {
    if (id !== undefined) {
      const fetchData = async () => {
        const response = await getProductById(`${url}/${id}`);
        MyForm.setValues({
          title: response.data.title || "",
          description: response.data.description || "",
          price: response.data.price || 1,
          stock: response.data.stock || 1,
          brand: response.data.brand || "",
          category: response.data.category || "",
          thumbnail: response.data.thumbnail || "",
        });
      };
      fetchData();
    }
  }, [id]);
  const initialValues = {
    title: "",
    description: "",
    price: 1,
    stock: 1,
    brand: "",
    category: "",
    thumbnail: "",
  };
  const onSubmit = (values) => {
    console.log(values);

    if (id === undefined) {
      console.log("add");
      PostData(url, values);
    } else {
      console.log("edit");
      editData(`${url}/${id}`, values);
    }
    navigate("/");
  };
  const MyForm = useFormik({
    initialValues,
    validationSchema: schemaAddProduct,
    onSubmit,
  });
  const operationImg = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function () {
          const canvas = document.createElement("canvas");
          const maxSize = 800; // أقصى طول أو عرض
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const resizedBase64 = canvas.toDataURL(file.type, 0.8); // 0.8 = جودة 80%
          console.log(resizedBase64);
          MyForm.setFieldValue("thumbnail", resizedBase64);
          console.log("تم حفظ الصورة المصغرة ✅");
        };
      };

      reader.readAsDataURL(file);
    } else {
      alert("من فضلك اختر صورة صحيحة فقط ❌");
      e.target.value = ""; // امسح الاختيار
      MyForm.setFieldValue("thumbnail", ""); // امسح thumbnail
    }
  };

  return (
    <div className="container mt-4">
      <h1>Add Product</h1>
      <div>
        <form onSubmit={MyForm.handleSubmit}>
          <div className="row">
            {inputs.map((field) => (
              <div key={field.name} className="mb-3">
                <label htmlFor={field.name} className="form-label">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  placeholder={field.placeholder}
                  className={`form-control ${
                    MyForm.errors[field.name] && MyForm.touched[field.name]
                      ? "is-invalid"
                      : ""
                  }`}
                  value={MyForm.values[field.name]}
                  onChange={MyForm.handleChange}
                  onBlur={MyForm.handleBlur}
                />
                {MyForm.errors[field.name] && MyForm.touched[field.name] && (
                  <div className="invalid-feedback">
                    {MyForm.errors[field.name]}
                  </div>
                )}
              </div>
            ))}
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
              <MyCard data={MyForm.values} id={id} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
