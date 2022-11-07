import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addNewSize } from "../services/SizeSevice";
import { getAllSizes } from "../services/SizeSevice";
import { deleteSize } from "../services/SizeSevice";
import "../styles/Table.css";

const SizeManagement = () => {
  const [createSize, setCreateSize] = useState({
    sizeName: "",
  });
  const [reload, setreload] = useState(0);
  const [sizes, setSizes] = useState([]);

  const handlerCreateSize = (event) => {
    event.preventDefault();
    addNewSize(createSize)
      .then((result) => {
        if (result) {
          console.log(result);
          toast.success("Add new size successfully!");
          setreload(Math.random);
        }
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
        toast.error(err.response.data.message);
      });
    console.log(createSize);
  };

  useEffect(() => {
    getAllSizes()
      .then((result) => {
        setSizes(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  const deleteHandle = (sizeId) => {
    toast.success(sizeId);
    deleteSize(sizeId)
      .then((result) => {
        toast.success("Delete success");
        setreload(Math.random);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const updateHandle = () => {
    toast.success("Update");
  };

  return (
    <div>
      <h1>Size Management</h1>
      <br />
      <h2>
        <Link to="/admin">Manage Product</Link> |Manage size|{" "}
        <Link to="/category">Manage categoy</Link> |{" "}
        <Link to="/manageUser">Manage user</Link>
      </h2>

      <form onSubmit={(event) => handlerCreateSize(event)}>
        <label htmlFor="sizeName">Size Name</label>
        <input
          required
          onChange={(event) => {
            setCreateSize(event.target.value);
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
          {/* <th></th> */}
        </tr>
        {sizes &&
          sizes?.map((size, index) => (
            <tr key={size.sizeId}>
              <td>{size.sizeId}</td>
              <td>{size.sizeName}</td>
              <td>
                <p onClick={() => deleteHandle(size.sizeId)}>Delete</p>
              </td>
              {/* <td>
                <p onClick={() => updateHandle()} type>
                  Update
                </p>
              </td> */}
            </tr>
          ))}
      </table>
    </div>
  );
};

export default SizeManagement;
