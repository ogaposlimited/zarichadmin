import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import useFetch from '../hooks/useFetch';
import './datatable.css';

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(`/users`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error during service worker registration:', error);
    }
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/auth/register/${params.row._id}`} style={{ textDecoration: 'none' }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
