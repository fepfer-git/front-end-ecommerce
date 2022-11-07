import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Table.css";

const AdminCatalog = () => {
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

  const createProductHandler = () => {};

  return (
    <div>
      <h1>Product Management</h1>
      <br />
      <h2>
        Add new product |<Link to="/size">Add new size</Link> |{" "}
        <Link to="/category">Add new categoy</Link>
      </h2>

      <form id="contact-form" onSubmit={(event) => createProductHandler(event)}>
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
        <button type="submit"> Create</button>
      </form>
    </div>
  );
};

export default AdminCatalog;
