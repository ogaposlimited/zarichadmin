import { DataGrid } from "@mui/x-data-grid";
import "./datatable.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
import useFetch from "../hooks/useFetch";

const Datatable2 = ({ columns, refreshKey, setRefreshKey }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const { data, loading, error, reFetch } = useFetch(`/blog`);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    setList(data);
  }, [data, refreshKey]); // Add refreshKey to the dependency array

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:7000/api/properties/${id}`);
  //     setList(list.filter((item) => item._id !== id));
  //     alert("successfully deleted");
  //   } catch (err) {
  //     console.error("Error during service worker registration:", error);
  //   }
  // };
  // const handleDelete = async (id) => {
  //   // Optimistically remove the item from the list
  //   setList((prevState) => prevState.filter((item) => item._id !== id));

  //   try {
  //     await axios.delete(`http://localhost:7000/api/properties/${id}`);
  //     alert("successfully deleted");
  //   } catch (err) {
  //     // Handle errors, e.g., show an error message or re-add the item to the list
  //     console.error("Error during service worker registration:", error);
  //     // You might need to re-add the item to the list if the deletion fails
  //     setList((prevState) => [...prevState, item]); // where 'item' is the deleted item
  //   }
  // };
  useEffect(() => {
    // If you want to trigger reFetch when refreshKey changes
    reFetch();
  }, [refreshKey, reFetch]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleDelete = async (id) => {
    console.log("Deleting item with ID:", id);
    try {
      await axios.delete(`${apiUrl}/api/blog/${id}`);

      // Update the list by filtering out the deleted item
      setList((prevList) => prevList.filter((item) => item._id !== id));

      alert("Successfully deleted");
      reFetch();
      // Trigger a re-render by changing the refreshKey
      setRefreshKey((prevKey) => {
        console.log("Incrementing refreshKey:", prevKey + 1);
        return prevKey + 1;
      });
    } catch (err) {
      console.error("Error during deletion:", err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`${apiUrl}/api/find/blog/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to="/dashboard/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[10]}
        checkboxSelection
        getRowId={(row) => row._id} // Provide a unique identifier for each row
      />
    </div>
  );
};

export default Datatable2;
