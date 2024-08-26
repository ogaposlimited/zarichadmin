import Datatable2 from "../datatable2/Datatable2";
import React, { useState } from "react";
import "./list.css";

const List2 = ({ columns }) => {
  const [refreshKey, setRefreshKey] = useState(0); // Define it here or initialize as needed
  console.log("Refresh Key in List2:", refreshKey);
  return (
    <div className="list">
      <div className="listContainer">
        {/* Pass the refreshKey prop to Datatable2 */}
        <Datatable2
          columns={columns}
          refreshKey={refreshKey}
          setRefreshKey={setRefreshKey}
        />
      </div>
    </div>
  );
};

export default List2;
