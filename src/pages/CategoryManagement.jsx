import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addNewCategory, deleteCategory } from "../services/CategoryService";
import { getAllCategories } from "../services/CategoryService";

const CategoryManagement = () => {
  const [createCategory, setCreateCategory] = useState({
    categoryName: "",
  });
  const [reload, setreload] = useState(0);
  const [categories, setCategories] = useState([]);

  const handlerCreateSize = (event) => {
    event.preventDefault();
    addNewCategory(createCategory)
      .then((result) => {
        if (result) {
          console.log(result);
          toast.success("Add new category successfully!");
          setreload(Math.random);
        }
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
        toast.error(err.response.data.message);
      });
    console.log(createCategory);
  };

  useEffect(() => {
    getAllCategories()
      .then((result) => {
        setCategories(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  const deleteHandle = (categoryId) => {
    toast.success(categoryId);
    deleteCategory(categoryId)
      .then((result) => {
        toast.success("Delete success");
        setreload(Math.random);
      })
      .catch((err) => {
        toast.success(err.response.data.message);
      });
  };

  return (
    <div>
      <h1>Size Management</h1>
      <br />
      <h2>
        <Link to="/admin">Add new product</Link> |
        <Link to="/size">Add new size</Link> | Add new categoy
      </h2>

      <form onSubmit={(event) => handlerCreateSize(event)}>
        <label htmlFor="sizeName">Size Name</label>
        <input
          required
          onChange={(event) => {
            setCreateCategory(event.target.value);
          }}
          name="productName"
          placeholder="Enter size name..."
          type="text"
        />
        <button type="submit"> Create</button>
      </form>

      <table id="customers">
        <tr>
          <th>Size Id</th>
          <th>Size Name</th>
          <th></th>
        </tr>
        {categories &&
          categories?.map((category, index) => (
            <tr key={category.categoryId}>
              <td>{category.categoryId}</td>
              <td>{category.categoryName}</td>
              <td>
                <p onClick={() => deleteHandle(category.categoryId)}>Delete</p>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default CategoryManagement;
