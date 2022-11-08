import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllProductsAdmin } from "../services/ProductService";
import { deleteAProduct } from "../services/ProductService";
import "../styles/Table.css";

const AdminCatalog = () => {
  const [reload, setreload] = useState(0);
  const [products, setProducts] = useState([]);
  const [createProduct, setCreateProduct] = useState({
    productName: "",
    productDescription: "",
    productDetails: [
      {
        stock: 0,
        price: 0,
        sizeId: 0,
      },
    ],

    categoryId: 0,
  });
  const fetchProduct = () => {
    getAllProductsAdmin()
      .then((result) => {
        setProducts(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, [reload]);

  const deleteHandle = (productId) => {
    deleteAProduct(productId)
      .then((result) => {
        toast.success("Delete product successfully!");
        setreload(Math.random);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div>
      <h1>Product Management</h1>
      <br />
      <h2>
        Manage Product |<Link to="/size">Manage size</Link> |{" "}
        <Link to="/category">Manage categoy</Link> |{" "}
        <Link to="/manageUser">Manage user</Link>
      </h2>

      <table id="customers">
        <tr>
          <th>Product Name</th>
          <th>Product Description</th>
          <th>Status</th>
          <th></th>
          <th></th>
        </tr>
        {products &&
          products.map((product, index) => (
            <tr key={product.productId}>
              <td>{product.productName}</td>
              <td>{product.productDescription}</td>
              <td>{product.status}</td>
              <td>
                <p onClick={() => deleteHandle(product.productId)}>Delete</p>
              </td>
            </tr>
          ))}
      </table>

      {/* <form id="contact-form" onSubmit={(event) => createProductHandler(event)}>
        <label htmlFor="productName">Product Name</label>
        <input
          required
          onChange={(event) => {
            setCreateProduct({
              ...createProduct,
              [event.target.name]: event.target.value,
            });
          }}
          name="productName"
          placeholder="Enter product name..."
          type="text"
        />
        <label htmlFor="productDescription">Description</label>
        <textarea
          required
          onChange={(event) => {
            setCreateProduct({
              ...createProduct,
              [event.target.name]: event.target.value,
            });
          }}
          name="productDescription"
          placeholder="Enter description..."
          type="text"
        />
        <label htmlFor="Category">Category</label>
        <select
          style={{ height: "30px", maxWidth: "300px", marginTop: "10px" }}
          onChange={(event) => {
            setCreateProduct({
              ...createProduct,
              [event.target.name]: event.target.value,
            });
          }}
          name="Category"
        >
          <option>asd</option>
        </select>

        <label htmlFor="Category">ProductDetail</label>
        <>
          <select
            style={{ height: "30px", maxWidth: "300px", marginTop: "10px" }}
            onChange={(event) => {
              setCreateProduct({
                ...createProduct,
                [event.target.name]: event.target.value,
              });
            }}
            name="Size"
          >
            <option></option>
          </select>
          <label htmlFor="productName">Stock</label>
          <input
            required
            onChange={(event) => {
              setCreateProduct({
                ...createProduct,
                [event.target.name]: event.target.value,
              });
            }}
            name="stock"
            placeholder="Enter stock..."
            type="number"
          />
          <label htmlFor="productName">Price</label>
          <input
            required
            onChange={(event) => {
              setCreateProduct({
                ...createProduct,
                [event.target.name]: event.target.value,
              });
            }}
            name="productName"
            placeholder="Enter price..."
            type="number"
          />
        </>

        {/* <p style={{ color: "red" }}>{error}</p> */}
      {/* <button type="submit"> Create</button>
      </form> */}
    </div>
  );
};

export default AdminCatalog;
